import { SheetState } from '../types';

export type MappedSheetData = SheetState;
export type MappedData = MappedSheetData[];

export interface ColumnMapping {
  csvColumnName: string;
  sheetId: string;
  sheetColumnId: string;
}

export type OnDataColumnsMappedCallback = (
  data: MappedData
) => Promise<MappedData>;

export interface MapperState {
  columnMappings: ColumnMapping[];
}

export interface MapperOptionValue {
  sheetId: string;
  sheetColumnId: string;
}

export interface MapperOption {
  label: string;
  value: MapperOptionValue;
}
