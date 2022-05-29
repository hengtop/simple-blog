import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "编号", width: 70 },
  { field: "name", headerName: "名称", flex: 1 },
  { field: "slug", headerName: "简称", flex: 1 },
  {
    field: "description",
    headerName: "描述",
    flex: 1,
  },
];
