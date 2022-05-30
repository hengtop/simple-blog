import React, { memo, useCallback, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { columns } from "./config";
import { service } from "network";
import { useMount } from "hooks";

import { FormContainer, TableContainer } from "./styled";
import Container from "components/container";
import CustomTable from "components/table";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default memo(function Index() {
  //props/state
  const [dataList, setDataList] = useState([]);
  const [selectTableList, setSelectTableList] = useState<number[]>([]);

  //redux hooks

  //other hooks
  const navigate = useNavigate();
  const client = service.useHttp();
  useMount(
    useCallback(async () => {
      getArticleList();
    }, []),
  );
  //其他逻辑

  // 获取表格内容
  const getArticleList = useCallback(async () => {
    const res = await client("/articleList");
    setDataList(res);
  }, []);

  const handleSelectionModelChange = useCallback((ids: number[]) => {
    setSelectTableList(ids);
  }, []);
  const handleAddArticle = useCallback(() => {}, []);
  const handleDeleteArticle = useCallback(() => {
    console.log(selectTableList);
  }, [selectTableList]);

  return (
    <>
      <Container>
        <FormContainer>
          <Stack spacing={2} direction="row">
            <Button onClick={handleAddArticle} variant="contained">
              新增文章
            </Button>
            <Button
              disabled={selectTableList.length === 0}
              onClick={handleDeleteArticle}
              variant="contained"
            >
              删除所选文章
            </Button>
            <Button
              disabled={selectTableList.length !== 1}
              onClick={() =>
                navigate({
                  pathname: "/admin",
                  search: `?${createSearchParams({
                    nav: "1",
                    articleId: "" + selectTableList[0],
                  })}`,
                })
              }
              variant="contained"
            >
              编辑所选文章
            </Button>
          </Stack>
        </FormContainer>
        <TableContainer>
          <CustomTable
            onSelectionModelChange={handleSelectionModelChange}
            columns={columns}
            dataLists={dataList}
          ></CustomTable>
        </TableContainer>
      </Container>
    </>
  );
});
