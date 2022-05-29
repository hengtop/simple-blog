import React, { memo, PropsWithChildren, useCallback } from "react";

import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridRowParams,
} from "@mui/x-data-grid";

interface TablePropsType {
  onRowDoubleClick?: (params: GridRowParams) => void;
  onSelectionModelChange?: (ids: number[]) => void;
  columns: GridColDef[];
  dataLists: object[];
}

export default memo(function Index(props: PropsWithChildren<TablePropsType>) {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑
  const handleSelectionModelChange = useCallback(
    (selectionModel: GridSelectionModel) => {
      props.onSelectionModelChange &&
        props.onSelectionModelChange(selectionModel as number[]);
    },
    [],
  );

  const handleRowDoubleClick = useCallback((params: GridRowParams) => {
    props.onRowDoubleClick && props.onRowDoubleClick(params);
  }, []);

  return (
    <DataGrid
      onRowDoubleClick={handleRowDoubleClick}
      onSelectionModelChange={handleSelectionModelChange}
      rows={props.dataLists}
      columns={props.columns}
      pageSize={6}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  );
});
