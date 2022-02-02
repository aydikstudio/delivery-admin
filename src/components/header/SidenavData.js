import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { dataMenu } from "./DataMenu";

export default function SidenavData() {

  return (
    <div>
      <List>
        {dataMenu.map((item, i) => (
          <ListItem component={NavLink} to={item.link} key={i}>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
