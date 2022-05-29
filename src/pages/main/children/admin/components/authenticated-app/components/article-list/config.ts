import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "编号", width: 70 },
  { field: "title", headerName: "标题", flex: 1 },
  { field: "author", headerName: "作者", width: 130 },
  {
    field: "categoryIds",
    headerName: "分类",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.categoryIds.join(",");
    },
  },
  {
    field: "publishTime",
    headerName: "发布时间",
    sortable: false,
    flex: 1,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "type",
    headerName: "状态",
    width: 130,
  },
];
