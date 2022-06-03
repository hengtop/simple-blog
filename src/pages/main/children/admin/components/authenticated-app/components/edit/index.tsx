import React, {
  memo,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  useEffect,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMount } from "hooks";
import { service } from "network";
import { awaitHandle, timeFormat } from "utils";
import { toast } from "react-toastify";
import zhCN from "date-fns/locale/zh-CN";

import {
  SubmitContent,
  EditWrapper,
  EditContainer,
  ContentItemContainer,
} from "./style";
import Vditor from "vditor";
import "vditor/src/assets/less/index.less";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoadingButton from "@mui/lab/LoadingButton";

interface CategoryType {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface ArticleParamsType {
  id?: number;
  title: string;
  context: string;
  publishTime?: string;
  type: number;
  categoryIds: number[];
}

export default memo(function Index() {
  //props/state
  const vditorRef = useRef<HTMLDivElement>(null);
  const [vd, setVd] = useState<Vditor>();
  const [publishTime, setPublishTime] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [articleType, setArticleType] = useState(1);
  const [categoryList, setCategoryList] = useState<Array<CategoryType>>([]);
  const [articleParams, setArticleParams] = useState<ArticleParamsType>();
  const [checkedCategoryList, setCheckedCategoryList] = useState<Array<number>>(
    [],
  );
  const [defaultCheckedCategoryList, setDefaultCheckedCategoryList] = useState<
    Array<number>
  >([]);
  //redux hooks

  //other hooks
  const [searchParams] = useSearchParams();
  const id = searchParams.get("articleId") ?? "";
  const client = service.useHttp();
  const theme = useTheme();
  useMount(
    useCallback(() => {
      if (vditorRef.current) {
        const vditor = new Vditor(vditorRef.current, {
          theme: theme.palette.mode === "dark" ? "dark" : "classic",
          mode: "sv",
          cache: {
            id: "vd",
          },
          preview: {
            hljs: {
              style: theme.palette.mode === "dark" ? "dracula" : "github",
            },
          },
          height: 600,
          fullscreen: {
            index: 9999,
          },
          after: () => {
            setVd(vditor);
          },
        });
      }
      getCategoryList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vditorRef, theme.palette.mode]),
  );

  useEffect(() => {
    if (searchParams.get("articleId")) {
      getArticleInfo(id);
    } else {
      vd && vd.setValue && vd.setValue("");
    }
  }, [vd, searchParams, id]);
  console.log(articleParams);
  //其他逻辑

  // 获取分类
  const getCategoryList = useCallback(async () => {
    const res = await client("/categoryList");
    setCategoryList(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 获取文章信息
  const getArticleInfo = useCallback(
    async (id: number | string) => {
      const res: ArticleParamsType = await client(`/articleList/${id}`);
      setArticleParams(res);
      vd?.setValue(res.context);
      setDefaultCheckedCategoryList(res.categoryIds);
      setCheckedCategoryList(res.categoryIds);
    },
    [searchParams, vd],
  );

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setArticleParams({
      ...(articleParams as ArticleParamsType),
      title: e.target.value,
    });
  };
  const handleChangeCategoryCheckBox = (id: number) => {
    let newList = [...checkedCategoryList];
    if (newList.includes(id)) {
      setArticleParams({
        ...(articleParams as ArticleParamsType),
        categoryIds: newList.filter((item) => item !== id),
      });
      setCheckedCategoryList(newList.filter((item) => item !== id));
    } else {
      newList.push(id);
      setArticleParams({
        ...(articleParams as ArticleParamsType),
        categoryIds: newList,
      });
      setCheckedCategoryList(newList);
    }
  };

  // 提交文章
  const handleSubmit = async () => {
    setLoading(true);
    let err = null;
    if (id) {
      // 编辑
      [, err] = await awaitHandle(
        client(`/articleList/${id}`, {
          method: "PUT",
          data: {
            ...articleParams,
            context: vd?.getValue(),
            type: articleType,
          },
        }),
      );
    } else {
      // 新增
      [, err] = await awaitHandle(
        client("/articleList", {
          method: "POST",
          data: {
            ...articleParams,
            context: vd?.getValue(),
            type: articleType,
          },
        }),
      );
    }
    if (!err) {
      toast.success("文章发布成功", {
        hideProgressBar: true,
        autoClose: 1000,
        position: "top-center",
      });
    }
    setLoading(false);
  };
  return (
    <EditContainer>
      <EditWrapper>
        <TextField
          required
          fullWidth
          margin="normal"
          label="文章标题"
          size="small"
          value={articleParams?.title ?? ""}
          onChange={handleChangeTitle}
        />
        <div ref={vditorRef}></div>
      </EditWrapper>
      <SubmitContent>
        <Typography variant="h6">发布日期</Typography>
        <ContentItemContainer>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhCN}>
            <DateTimePicker
              ampm={false}
              inputFormat="yyyy-MM-dd HH:mm"
              renderInput={(props) => <TextField {...props} />}
              label="选择文章发布日期"
              value={articleParams?.publishTime ?? null}
              onChange={(newValue: any) => {
                setPublishTime(newValue);
                setArticleParams({
                  ...(articleParams as ArticleParamsType),
                  publishTime: timeFormat(newValue),
                });
              }}
            />
          </LocalizationProvider>
        </ContentItemContainer>
        <Typography variant="h6">分类</Typography>
        <ContentItemContainer>
          <FormGroup>
            {categoryList.map((item, index) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    defaultChecked={defaultCheckedCategoryList?.includes(
                      item.id,
                    )}
                    checked={checkedCategoryList?.includes(item.id)}
                    onChange={() => handleChangeCategoryCheckBox(item.id)}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        </ContentItemContainer>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
        >
          发布文章
        </LoadingButton>
      </SubmitContent>
    </EditContainer>
  );
});
