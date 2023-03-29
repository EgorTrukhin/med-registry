import { observer } from "mobx-react-lite";
import { StateTreat } from "../../store/store";
import { Board } from "../Board/Board";
import { Sidebar } from "../Sidebar/Sidebar";
import "./AppointmentList.css";
import {Context} from "../../index";
import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import {TextControl} from "../controls/TextControl/TextControl";
import SelectControl from "../controls/SelectControl/SelectControl";
import {IDiet, IPatient, ITreatment} from "../../store/models";
import {DataBaseApi} from "../../api/Api";

export interface AppointmentListHeader {
  patient?: IPatient;
  diet?: IDiet;
  treatment?: ITreatment;
  room?: number;
}

interface AppointmentListModalState {
  patients?: IPatient[];
  diets?: IDiet[];
  treatments?: ITreatment[];
}

export const AppointmentList = observer(() => {
  const { dataStore } = useContext(Context);
  const [header, changeHeader] = useState<AppointmentListHeader>({})
  const [reportModalActive, setReportModalActive] = useState(false);
  const [reportModalState, changeReportModalState] = useState<AppointmentListModalState>({});

  if (!dataStore.isLoaded()) {
    return null;
  }

  const types = dataStore.getTypes();
  const expandedTypeId = dataStore.getExpandedTypeId();
  const searchValue = dataStore.getSearchValue();

  let treats: Array<StateTreat> = [];
  let boardTreats: Array<StateTreat> = [];
  let typeName: string = "";

  if (expandedTypeId) {
    const stateItem = dataStore.getStateItem(expandedTypeId);
    typeName = dataStore.getTypeNameById(expandedTypeId);
    treats = stateItem.treats;
    boardTreats = treats.filter(treat => stateItem.checkeds.includes(treat.id))
  }

  const onExpand = (id) => {
    dataStore.setExpandedTypeId(expandedTypeId !== id ? id : null);
  }

  const onStateTreatChange = (id, typeId, date) => {
    dataStore.onStateTreatChange(id, typeId, date);
  }

  const onSearchChange = (text) => {
    dataStore.onSearchChange(text);
  } 

  const onClearAll = (typeId) => {
    dataStore.onClearAll(typeId);
  }

  const openReportModal = () => {
    Promise.all([
      dataStore.getPatients(),
      dataStore.getDiets(),
      dataStore.getTreatments()
    ])
    .then(([patients, diets, treatments]) => {
      changeReportModalState({patients: patients.data, diets: diets.data, treatments: treatments.data});
      setReportModalActive(true);
    });
  }

  const reportModal = () => {
    if (!reportModalActive) {
      return null;
    }

    const {patient, diet, treatment, room} = header;

    const onCreate = () => {
      const data = dataStore.getReportResultData();

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const fileDate = mm + '-' + dd + '-' + yyyy;

      const filename = `Лист назначений ${patient && patient.firstName + " " + patient.secondName + " " + patient.middleName || ""} ${fileDate}.xlsx`;
      DataBaseApi.excel({header, content: data})
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          setReportModalActive(false);
        })
        .catch(error => console.error(error));
    }

    const handlePatientChange = (newPatientId) => {
      const newPatient = (reportModalState.patients || []).find(p => String(p.id) === String(newPatientId));
      changeHeader({...header, patient: newPatient})
    }

    const handleRoomNumChange = (newRoomNum) => {
      changeHeader({...header, room: newRoomNum})
    }

    const handleDietChange = (newDietId) => {
      const newDiet = (reportModalState.diets || []).find(p => String(p.id) === String(newDietId));
      changeHeader({...header, diet: newDiet})
    }

    const handleTreatmentChange = (newTreatmentId) => {
      const newTreatment = (reportModalState.treatments || []).find(p => String(p.id) === String(newTreatmentId));
      changeHeader({...header, treatment: newTreatment})
    }

    return (
        <Modal active={reportModalActive} setActive={setReportModalActive} onConfirm={onCreate} confirmText={"Сформировать"}>
          <div className="create_modal_content">
            <SelectControl
                label="Пациент"
                onChange={handlePatientChange}
                items={(reportModalState.patients || []).map(p => {return {id: p.id, name: p.firstName + " " + p.secondName + " " + p.middleName}})}
                selectedId={patient?.id || ""}
                placeholder={"Выберите пациента..."}
            />
            <TextControl
                label="Номер палаты"
                value={room && String(room) || ""}
                placeholder="Укажите номер палаты..."
                onChange={e => handleRoomNumChange(e.target.value)}
                valid={true}
            />
            <SelectControl
                label="Диета"
                onChange={handleDietChange}
                items={(reportModalState.diets || []).map(p => {return {id: p.id, name: p.dietName}})}
                selectedId={diet?.id || ""}
                placeholder={"Выберите диету..."}
            />
            <SelectControl
                label="Режим"
                onChange={handleTreatmentChange}
                items={(reportModalState.treatments || []).map(p => {return {id: p.id, name: p.treatmentName}})}
                selectedId={treatment?.id || ""}
                placeholder={"Выберите режим..."}
            />
          </div>
        </Modal>
    );
  }

  return (
    <div className="appointment">
      <div className="report-editor-content">
        <Sidebar
            types={types}
            expandedTypeTreats={treats}
            expandedTypeId={expandedTypeId}
            onExpand={onExpand}
            onTreatChange={onStateTreatChange}
            onSearchChange={onSearchChange}
            searchValue={searchValue}
        />
        <Board
            typeId={expandedTypeId}
            name={typeName}
            treats={boardTreats}
            onTreatChange={onStateTreatChange}
            onClearAll={onClearAll}
        />
      </div>
      <div className="appointment-footer">
        <div className="createForm" onClick={() => openReportModal()}>
          <span>Сформировать</span>
        </div>
      </div>
      {reportModal()}
    </div>
  );
});