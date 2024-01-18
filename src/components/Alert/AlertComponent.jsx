import { Alert } from "@mui/material";
export default function AlertComponent({ status, title }) {
  return <Alert severity={status}>{title}</Alert>;
}
