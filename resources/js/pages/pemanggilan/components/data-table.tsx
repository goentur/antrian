import LoadingData from '@/components/data-table/loading-data'
import NoData from '@/components/data-table/no-data'

type DataTableProps = {
    loading: boolean
    data: []
    from: number
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DataTable({
    loading,
    data,
    from,
    setIsEdit,
}: DataTableProps) {
    return (
        <table className="w-full text-left border-collapse border">
            <thead>
                <tr className="uppercase text-sm leading-normal">
                    <th className="p-2 border w-1">NO</th>
                    <th className="p-2 border">PELAYANAN</th>
                    <th className="p-2 border">NOMOR ANTRIAN</th>
                    <th className="p-2 border w-1">STATUS</th>
                </tr>
            </thead>
            <tbody className="font-light">
                {loading && <LoadingData colSpan={4}/>}
                {data.length > 0 ? (
                    data.map((value: any, index: number) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-slate-900 align-text-top"
                        >
                            <td className="px-2 py-1 border text-center">{from++}</td>
                            <td className="px-2 py-1 border">{value.pelayanan.nama}</td>
                            <td className="px-2 py-1 border">{value.nama}</td>
                            <td className="px-2 py-1 border">{value.status.label}</td>
                        </tr>
                    ))
                ) : (!loading ?<NoData colSpan={4}/>: null)}
            </tbody>
        </table>
    )
}
