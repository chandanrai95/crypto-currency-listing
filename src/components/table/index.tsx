import React, { JSX } from "react";

const trClasses = ``;
const thClasses = `border border-gray-200 p-2 text-black`;
const tdClasses = `border border-gray-200 p-2 text-black`

interface columnsProps {
  header: string,
  headerKey?: string | undefined,
  formatter?: Function | undefined,
  customComponet?: Function | undefined
}

interface TableProps {
  columns: columnsProps[],
  data: Record<string, any>[],
  onRowClick?: Function
}

const Table = ({
  columns,
  data,
  onRowClick = () => {}
}: TableProps) => {
  return (
    <table className="crypto-table table-auto rounded-xl border-gray-100 w-full text-center ">
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr className={trClasses}>
          {
            columns.map((col) => {
              return (
                <th key={`${col.header}`} className={thClasses}>{col.header}</th>
              )
            })

          }
        </tr>

      </thead>
      <tbody className="max-h-10">
          {
            data.map((d1, idx) => {
              const onPress = () => {
                onRowClick(d1)
              }
              return (
                <tr className="cursor-pointer hover:bg-gray-300" key={`row-${idx}`} onClick={onPress}>
                  {
                    columns.map((col) => {
                      const {
                        header,
                        headerKey,
                        formatter,
                        customComponet
                      } = col
                      let val =headerKey ? d1[headerKey] || '' : d1 || ''
                      val = formatter ? formatter(val) : val;
                      if (customComponet) {
                        return <td key={`row-item-${idx}-${headerKey || header}`} className={tdClasses}> {customComponet(val) }</td>
                      }
                      return (
                        <td key={`row-item-${idx}-${headerKey || header}`} className={tdClasses}>{val}</td>
                      )
                    })
                  }
                </tr>
              )
            })

          }

      </tbody>
    </table>
  )
}

export default Table;