export const nbrPercent = <TRow extends TRowBase>({
  rowData,
  options,
  locale,
  params,
}: IColumnBodyTemplateArgs<TRow>): string | JSX.Element | null => {
  const field = options.field as keyof TRow;
  let formattedValue: string;
  const cellDataNull = rowData[field] == null;

  if (!cellDataNull) {
    if (
      typeof rowData[field] === 'number' ||
      !isNaN(parseFloat(rowData[field] as unknown as string))
    ) {
      const formatValueArguments: IFormatNumber = {
        num: rowData[field] as unknown as number,
        locale: locale,
      };

      if (params && params.hasOwnProperty('precision')) {
        formatValueArguments['fractionDigits'] = params.precision as number;
      }

      formattedValue = formatNumber(formatValueArguments);
      const fieldData = rowData[field] as number;

      // sprawdzamy indicator
      const indicatorField = `${String(field)}_indicator`;
      const hasIndicator = rowData[indicatorField as keyof TRow] === true;

      // style domyślne
      let cellStyle: React.CSSProperties = {
        backgroundColor: 'white',
        color: fieldData < 0 ? 'red' : 'black',
      };

      // jeśli indicator = true → czerwone tło, biała czcionka
      if (hasIndicator) {
        cellStyle = {
          backgroundColor: 'red',
          color: 'white',
        };
      }

      return <div style={cellStyle}>{`${formattedValue}%`}</div>;
    } else {
      console.error('not numeric data for field:[' + (field as string) + ']');
    }
  } else {
    return null;
  }

  return null;
};
