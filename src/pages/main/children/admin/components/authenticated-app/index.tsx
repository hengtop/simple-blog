import React, { memo, useState } from "react";
import { useAuth } from "context/auth";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ArticleList from "./components/article-list";
import Edit from "./components/edit";
import ClassifyList from "./components/classify-list";
import Setting from "./components/setting";
import Typography from "@mui/material/Typography";

export default memo(function Index() {
  //props/state
  const [value, setValue] = useState("1");

  //redux hooks

  //other hooks
  const { logout } = useAuth();

  //其他逻辑

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="文章撰写" value="1" />
            <Tab label="文章列表" value="2" />
            <Tab label="文章分类" value="3" />
            <Tab label="设置" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Edit />
          <button onClick={logout}>退出</button>
        </TabPanel>
        <TabPanel value="2">
          <ArticleList />
        </TabPanel>
        <TabPanel value="3">
          <ClassifyList />
        </TabPanel>
        <TabPanel value="4">
          <Setting />
        </TabPanel>
      </TabContext>
    </Box>
  );
});
