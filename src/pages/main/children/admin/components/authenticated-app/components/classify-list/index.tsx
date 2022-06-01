import type { GridRowParams } from "@mui/x-data-grid";
import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import { columns } from "./config";
import { service } from "network";
import { useMount } from "hooks";
import { awaitHandle } from "utils";

import {
  FormContainer,
  TableContainer,
  ModelWrapper,
  CloseArrow,
  ModalFormWrapper,
} from "./styled";
import Container from "components/container";
import CustomTable from "components/table";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FlexCenter from "components/flex-center";

interface CategoryParamsType {
  id?: number;
  name: string;
  slug: string;
  description?: string;
}

export default memo(function Index() {
  //props/state
  const [dataList, setDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectTableList, setSelectTableList] = useState<number[]>([]);
  const [categoryParams, setCategoryParams] =
    useState<CategoryParamsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitTitle, setSubmitTitle] = useState("新增分类");

  //redux hooks

  //other hooks
  const client = service.useHttp();
  useMount(
    useCallback(async () => {
      getCategoryList();
    }, []),
  );
  //其他逻辑
  // 获取分类数据
  const getCategoryList = useCallback(async () => {
    const res = await client("/categoryList");
    setDataList(res);
  }, []);
  // 弹窗开/关
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    setCategoryParams(null);
  }, []);

  // 获取选中行
  const handleSelectionModelChange = useCallback((ids: number[]) => {
    setSelectTableList(ids);
  }, []);
  // 删除
  const handleDeleteArticle = useCallback(() => {
    console.log(selectTableList);
  }, [selectTableList]);

  // 编辑框
  const handleChangeCategory = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
  ) => {
    if (e.target.value) {
      setCategoryParams({
        ...(categoryParams as CategoryParamsType),
        [type]: e.target.value,
      });
    }
  };

  // 分类提交
  const handleSubmitCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (categoryParams?.id) {
      //编辑
      console.log("编辑", categoryParams);
      const [, err] = await awaitHandle(
        client(`/categoryList/${categoryParams?.id}`, {
          method: "PUT",
          data: categoryParams as CategoryParamsType,
        }),
      );
      if (err) {
        console.log(err);
      }
    } else {
      // 新增
      const [, err] = await awaitHandle(
        client(`/categoryList`, {
          method: "POST",
          data: categoryParams as CategoryParamsType,
        }),
      );
      if (err) {
        console.log(err);
      }

      console.log("新增", categoryParams);
    }
    await getCategoryList();
    handleClose();
    setLoading(false);
  };

  // 新增按钮
  const handleAddCategory = useCallback(() => {
    handleOpen();
    setSubmitTitle("新增分类");
  }, []);

  // 双击编辑
  const handleRowDoubleClick = useCallback(
    (params: GridRowParams) => {
      setSubmitTitle(`编辑 ${params?.row.name}`);
      setCategoryParams({
        ...params?.row,
      });
      handleOpen();
    },
    [handleOpen],
  );

  // 点击按钮编辑
  const handleEditCategory = () => {
    for (const item of dataList) {
      if ((item as CategoryParamsType)?.id === selectTableList[0]) {
        setCategoryParams({
          ...(item as CategoryParamsType),
        });
        break;
      }
    }
    handleOpen();
  };

  return (
    <>
      <Container>
        <FormContainer>
          <Stack spacing={2} direction="row">
            <Button onClick={handleAddCategory} variant="contained">
              新增分类
            </Button>
            <Button
              /* 只能单选的时候进行编辑 */
              disabled={selectTableList.length !== 1}
              onClick={handleEditCategory}
              variant="contained"
            >
              编辑分类
            </Button>
            <LoadingButton
              loading={loading}
              disabled={selectTableList.length === 0}
              onClick={handleDeleteArticle}
              variant="contained"
            >
              删除所选分类
            </LoadingButton>
          </Stack>
          <Modal keepMounted open={open} onClose={handleClose}>
            <ModelWrapper>
              <Container>
                <ModalFormWrapper>
                  <CloseArrow onClick={handleClose}>
                    <CloseIcon />
                  </CloseArrow>
                  <Typography variant="h6">{submitTitle}</Typography>
                  <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmitCategory}
                  >
                    <TextField
                      /* 这里需要在空值的时候设置一个默认值，否则就会导致label重叠到value上 */
                      value={categoryParams?.name ?? ""}
                      onChange={(e) => handleChangeCategory(e, "name")}
                      fullWidth
                      required
                      name="name"
                      type="text"
                      label="分类名称"
                      placeholder="请输入分类名称"
                      margin="normal"
                    />
                    <TextField
                      value={categoryParams?.slug ?? ""}
                      onChange={(e) => handleChangeCategory(e, "slug")}
                      fullWidth
                      required
                      autoComplete="slug"
                      name="slug"
                      type="text"
                      label="简称"
                      placeholder="请输入简称"
                      margin="normal"
                    />
                    <TextField
                      value={categoryParams?.description ?? ""}
                      onChange={(e) => handleChangeCategory(e, "description")}
                      fullWidth
                      name="description"
                      type="text"
                      label="描述"
                      placeholder="请输入描述"
                      margin="normal"
                    />
                    <FlexCenter>
                      <Stack spacing={2} direction={"row"}>
                        <LoadingButton
                          type="submit"
                          loading={loading}
                          variant="contained"
                        >
                          确认
                        </LoadingButton>
                        <Button onClick={handleClose} variant="contained">
                          取消
                        </Button>
                      </Stack>
                    </FlexCenter>
                  </Box>
                </ModalFormWrapper>
              </Container>
            </ModelWrapper>
          </Modal>
        </FormContainer>
        <TableContainer>
          <CustomTable
            onRowDoubleClick={handleRowDoubleClick}
            onSelectionModelChange={handleSelectionModelChange}
            columns={columns}
            dataLists={dataList}
          ></CustomTable>
        </TableContainer>
      </Container>
    </>
  );
});
