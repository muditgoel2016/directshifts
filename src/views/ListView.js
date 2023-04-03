import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function ListView({ records, headerKeyMap, rowClickable, handleRowClick }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="records table">
                <TableHead>
                    <TableRow>
                        {Object.keys(headerKeyMap).map((headerTitle) => (
                            <TableCell align="left" key={headerTitle}>
                                {headerTitle}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map((record) => {
                        const isClickable =
                            rowClickable === "internal" || rowClickable === "external";
                        const handleRowClickWrapper = () => handleRowClick(record, rowClickable);
                        return (
                            <TableRow
                                hover={isClickable}
                                key={record.id}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    cursor: isClickable ? "pointer" : "default",
                                }}
                                onClick={isClickable ? handleRowClickWrapper : undefined}
                            >
                                {Object.values(headerKeyMap).map((value) => (
                                    <TableCell align="left" key={value}>
                                        {record[value]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ListView;