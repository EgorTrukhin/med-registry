const sequelize = require("../database");
const { DataTypes } = require("sequelize");

// Лист назначений
////////////////////////////////////////////////////
const Type = sequelize.define("type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
});

const Treat = sequelize.define("treat", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
});

const TreatWithDate = sequelize.define("treatWithDate", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    receiptDate: {type: DataTypes.DATE}
});

const Diet = sequelize.define("diet", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dietName: {type: DataTypes.STRING},
});

const Treatment = sequelize.define("treatment", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    treatmentName: {type: DataTypes.STRING}
});

const AppointmentList = sequelize.define("appointmentList", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    listName: {type: DataTypes.STRING},
    roomNumber: {type: DataTypes.INTEGER}
});

Type.hasMany(Treat, {onDelete: 'CASCADE'});
Treat.belongsTo(Type);

Treat.hasOne(TreatWithDate, {foreignKey: 'treatId'});
TreatWithDate.belongsTo(Treat);

Diet.hasOne(AppointmentList, {foreignKey: 'dietId'});
AppointmentList.belongsTo(Diet);

Treatment.hasOne(AppointmentList, {foreignKey: 'treatmentId'});
AppointmentList.belongsTo(Treatment);

AppointmentList.hasMany(TreatWithDate, {onDelete: 'CASCADE'});
TreatWithDate.belongsTo(AppointmentList);

// Лист осмотра
////////////////////////////////////////////////////
const TemplateValue = sequelize.define("templateValue", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING}
});

const TemplateAttr = sequelize.define("templateAttr", {
    ident: {type: DataTypes.STRING, primaryKey: true},
    description: {type: DataTypes.STRING}
});

const FilledValue = sequelize.define("filledValue", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ident: {type: DataTypes.STRING}
});

const InspectionListTemplate = sequelize.define("inspectionListTemplate", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    templateName: {type: DataTypes.STRING},
    content: {type: DataTypes.TEXT}
});

const FilledTemplate = sequelize.define("filledTemplate", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const InspectionList = sequelize.define("inspectionList", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    listName: {type: DataTypes.STRING}
});

TemplateValue.hasOne(FilledValue, {foreignKey: 'templateValueId'});
FilledValue.belongsTo(TemplateValue);

TemplateAttr.hasMany(TemplateValue, {onDelete: 'CASCADE'});
TemplateValue.belongsTo(TemplateAttr);

InspectionListTemplate.hasMany(TemplateAttr, {onDelete: 'CASCADE'});
TemplateAttr.belongsTo(InspectionListTemplate);

InspectionListTemplate.hasOne(FilledTemplate, {foreignKey: 'inspectionListTemplateId'});
FilledTemplate.belongsTo(InspectionListTemplate);

FilledTemplate.hasMany(FilledValue, {onDelete: 'CASCADE'});
FilledValue.belongsTo(FilledTemplate);

FilledTemplate.hasOne(InspectionList, {foreignKey: 'filledTemplateId'});
InspectionList.belongsTo(FilledTemplate);


// Пациент
////////////////////////////////////////////
const Receiption = sequelize.define("receiption", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    receiptDate: {type: DataTypes.DATE},
});

const Patient = sequelize.define("patient", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    middleName: {type: DataTypes.STRING}
});

Patient.hasMany(Receiption, {onDelete: 'CASCADE'});
Receiption.belongsTo(Patient);

InspectionList.hasOne(Receiption, {foreignKey: 'inspectionListId'});
Receiption.belongsTo(InspectionList);

AppointmentList.hasOne(Receiption, {foreignKey: 'appointmentListId'});
Receiption.belongsTo(AppointmentList);

/////////////////////////////////////////////
module.exports = {
    Type,
    Treat,
    TreatWithDate,
    Diet,
    Treatment,
    AppointmentList,
    TemplateValue,
    TemplateAttr,
    FilledValue,
    InspectionListTemplate,
    FilledTemplate,
    InspectionList,
    Receiption,
    Patient
}