import React, { memo, useState, useCallback, useRef, ChangeEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { useMount } from "hooks";
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

export default memo(function Index() {
  //props/state
  const vditorRef = useRef<HTMLDivElement>(null);
  const [vd, setVd] = useState<Vditor>();
  const [publishDate, setPublishDate] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  //redux hooks

  //other hooks
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
            vditor.setValue("");
            setVd(vditor);
          },
        });
      }
    }, [vditorRef, theme.palette.mode]),
  );

  //其他逻辑
  const classList = ["默认分类", "javascript", "前端"];
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 提交文章
  const handleSubmit = () => {
    console.log(111);
    console.log({
      title,
      publishDate,
      context: vd?.getValue(),
    });
  };

  return (
    <EditContainer>
      <EditWrapper>
        <TextField
          fullWidth
          margin="normal"
          label="文章标题"
          size="small"
          value={title}
          onChange={handleChangeTitle}
        />
        <div ref={vditorRef}></div>
      </EditWrapper>
      <SubmitContent>
        <Typography variant="h6">发布日期</Typography>
        <ContentItemContainer>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhCN}>
            <DateTimePicker
              inputFormat="yyyy-MM-dd hh:mm a"
              renderInput={(props) => <TextField {...props} />}
              label="选择文章发布日期"
              value={publishDate}
              onChange={(newValue: any) => {
                setPublishDate(newValue);
              }}
            />
          </LocalizationProvider>
        </ContentItemContainer>
        <Typography variant="h6">分类</Typography>
        <ContentItemContainer>
          <FormGroup>
            {classList.map((item, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox defaultChecked={index === 0} />}
                label={item}
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
