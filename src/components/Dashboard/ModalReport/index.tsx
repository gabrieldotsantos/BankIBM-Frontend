// @ts-nocheck
import { useEffect, useState } from 'react';
import { 
    DataTable, 
    TableContainer, 
    Table,
    TableRow, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableBody,
    TableToolbar,
    Button,
    TableToolbarContent,
    TableToolbarSearch,
    Pagination,
    Modal,
} from 'carbon-components-react';
import { api, formatDate, pdfGerar } from '../../../utils/index';

const headerData = [
    {
      header: 'Tipo',
      key: 'transactionType',
    },
    {
      header: 'Origem',
      key: 'nameAndAccountSource',
    },
    {
      header: 'Destino',
      key: 'nameAndAccountDestiny',
    },
    {
      header: 'Data',
      key: 'dateInString',
    },
    {
      header: 'Valor R$',
      key: 'value',
    },
];

interface Transaction {
    id: string,
    nameAndAccountDestiny: string,
    nameAndAccountSource: string,
    dateInString: string,
    transactionType: string,
    value: string,
}

interface IPropsModal {
    idClient: number,
    open: boolean,
    setOpen: Function,
}

export function ModalReport(props: IPropsModal) {
    const [transactions, setTransactions] = useState<Transaction[]>([{
        id: "",
        nameAndAccountDestiny: "",
        nameAndAccountSource: "",
        dateInString: "",
        transactionType: "",
        value: "",
    }]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [transactionsPage, setTransactionsPage] = useState(transactions);

    useEffect(() => {
        if (props.idClient === 0)
            return;

        api.post("Transactions/Date", {ClientSourceID: props.idClient, TransactionDate: formatDate(new Date())})
        .then(response => {
            setTransactions(response.data)
            setTransactionsPage(response.data.slice(0, pageSize))
        });
    }, [pageSize, props.idClient, props.open]);

    function batchActionClick() {
        pdfGerar('data-table-report', `Relatorio-Page-${page}`);
    }

    return(
        <Modal
            open={props.open}
            modalHeading={`Relatório ${formatDate(new Date())}`}
            passiveModal
            onRequestClose={() => props.setOpen(false)}
        >
            <div id="data-table-report">
                <DataTable rows={transactionsPage} headers={headerData}>
                    {({ 
                        rows, 
                        headers,       
                        getHeaderProps,
                        getToolbarProps,
                        getBatchActionProps,
                        onInputChange,
                        getTableProps,  
                    }) => (
                        <TableContainer title="Extratos">
                            <TableToolbar {...getToolbarProps()}>
                                <TableToolbarContent>
                                    <TableToolbarSearch
                                        persistent={true}
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                        onChange={onInputChange}
                                    />
                                    <Button onClick={() => batchActionClick()}>Download</Button>
                                </TableToolbarContent>
                            </TableToolbar>
                        <Table {...getTableProps()} size='normal' useZebraStyles>
                            <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableHeader {...getHeaderProps({ header })}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                {row.cells.map((cell) => (
                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                ))}
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    )}
                </DataTable>
            </div>
            <Pagination
                backwardText="Previous page"
                forwardText="Next page"
                itemsPerPageText="Items per page:"
                page={1}
                pageNumberText="Page Number"
                onChange={(e) => { 
                   let startPag = (e.page * e.pageSize) - e.pageSize;
                    setTransactionsPage(transactions.slice(startPag, (startPag + e.pageSize)));
                    setPageSize(e.pageSize);
                    setPage(e.page)
                }}
                pageSize={pageSize}
                pageSizes={[ 5, 10 ]}
                totalItems={transactions.length}
                isLastPage 
            />
        </ Modal>
    );
}