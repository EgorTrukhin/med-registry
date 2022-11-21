import MaterialTable from 'material-table';

export interface TableProps {
  columns?: Array<any>
  data?: Array<any>;
  actions?: Array<any>;
}

export const Table = (props: TableProps) => {
  const { columns, data, actions } = props

  const localization = {
    body: {
      emptyDataSourceMessage: "Нет данных"
    },
    header: {
      actions: 'Действия'
    },
    toolbar: {
      searchTooltip: "Поиск",
      searchPlaceholder: "Поиск"
    },
    pagination: {
      labelDisplayedRows: "{from}-{to} из {count}",
      labelRowsSelect: "строк",
      labelRowsPerPage: "Строк на странице",
      firstAriaLabel: "Первая страница",
      firstTooltip: "Первая страница",
      previousAriaLabel: "Предыдущая страница",
      previousTooltip: "Предыдущая страница",
      nextAriaLabel: "Следующая страница",
      nextTooltip: "Следующая страница",
      lastAriaLabel: "Последняя страница",
      lastTooltip: "Последняя страница"
    }
  }

  return (
      <MaterialTable
          localization={localization}
          columns={columns}
          data={data}
          actions={actions}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            searchFieldAlignment: "left",
            draggable: false,
            showTitle: false,
            paginationType: "stepped",
            pageSize: 10,
            pageSizeOptions: []
          }}
      />
  );
}
