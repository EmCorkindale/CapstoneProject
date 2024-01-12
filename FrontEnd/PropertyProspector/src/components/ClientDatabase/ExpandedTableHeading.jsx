import React from "react";
import { Table } from "react-bootstrap";
import { useOpenController } from "../../hooks/isOpen";
import { ExpandButton } from "../Reusable/expandButton";
import { ExpandedTableContents } from "./ExpandedTableContents";

export function ExpandedTableHeading() {
  const { isOpen, toggle } = useOpenController(false);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <td colSpan={1}>
            <ExpandButton isOpen={isOpen} toggle={toggle}></ExpandButton> Property Requirements
          </td>
        </tr>
      </thead>
      <tbody>
        {isOpen && <ExpandedTableContents />}
      </tbody>
    </Table>
  );
}
