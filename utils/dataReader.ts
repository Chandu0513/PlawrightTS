
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { log } from './logger';

export interface ExcelRow {
  [key: string]: string | number | boolean;
}

export class DataReader {
  private static dataCache: Map<string, ExcelRow[]> = new Map();
  private static excelFilePath: string = path.join(process.cwd(), 'test-data');

  /**
   * Set the path where Excel files are stored
   * @param dirPath - Path to directory containing Excel files
   */
  static setDataPath(dirPath: string): void {
    this.excelFilePath = dirPath;
    log.info(`Data path set to: ${dirPath}`);
  }

  /**
   * Read data from Excel file
   * @param fileName - Name of the Excel file (with or without .xlsx extension)
   * @param sheetName - Optional: Name of the sheet to read (defaults to first sheet)
   * @returns Array of objects representing rows
   */
  static readExcelData(fileName: string, sheetName?: string): ExcelRow[] {
    try {
      const cacheKey = `${fileName}_${sheetName || 'default'}`;
      
      // Check if data is already cached
      if (this.dataCache.has(cacheKey)) {
        log.info(`Reading ${cacheKey} from cache`);
        return this.dataCache.get(cacheKey) || [];
      }

      // Construct full file path
      const fullFileName = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
      const filePath = path.join(this.excelFilePath, fullFileName);

      // Verify file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`Excel file not found: ${filePath}`);
      }

      log.info(`Reading Excel file: ${filePath}`);

      // Read the Excel file
      const workbook = XLSX.readFile(filePath);

      // Get the sheet name
      const sheet = sheetName || workbook.SheetNames[0];
      if (!workbook.SheetNames.includes(sheet)) {
        throw new Error(
          `Sheet "${sheet}" not found in workbook. Available sheets: ${workbook.SheetNames.join(', ')}`
        );
      }

      log.info(`Reading sheet: ${sheet}`);

      // Convert sheet to JSON
      const worksheet = workbook.Sheets[sheet];
      const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

      if (data.length === 0) {
        log.warn(`No data found in sheet: ${sheet}`);
      } else {
        log.info(`Successfully read ${data.length} rows from ${sheet}`);
      }

      // Cache the data
      this.dataCache.set(cacheKey, data);

      return data;
    } catch (error) {
      log.error(`Error reading Excel file: ${error}`);
      throw error;
    }
  }

  /**
   * Get all sheet names from an Excel file
   * @param fileName - Name of the Excel file
   * @returns Array of sheet names
   */
  static getSheetNames(fileName: string): string[] {
    try {
      const fullFileName = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
      const filePath = path.join(this.excelFilePath, fullFileName);

      if (!fs.existsSync(filePath)) {
        throw new Error(`Excel file not found: ${filePath}`);
      }

      const workbook = XLSX.readFile(filePath);
      return workbook.SheetNames;
    } catch (error) {
      log.error(`Error getting sheet names: ${error}`);
      throw error;
    }
  }

  /**
   * Get a specific row by index
   * @param fileName - Name of the Excel file
   * @param rowIndex - Index of the row (0-based)
   * @param sheetName - Optional: Name of the sheet
   * @returns Single row object
   */
  static getRow(fileName: string, rowIndex: number, sheetName?: string): ExcelRow {
    const data = this.readExcelData(fileName, sheetName);
    if (rowIndex < 0 || rowIndex >= data.length) {
      throw new Error(`Row index ${rowIndex} out of bounds. Total rows: ${data.length}`);
    }
    return data[rowIndex];
  }

  /**
   * Get first row (commonly used for single row data)
   * @param fileName - Name of the Excel file
   * @param sheetName - Optional: Name of the sheet
   * @returns First row object
   */
  static getFirstRow(fileName: string, sheetName?: string): ExcelRow {
    return this.getRow(fileName, 0, sheetName);
  }

  /**
   * Filter data by column value
   * @param fileName - Name of the Excel file
   * @param columnName - Column name to filter by
   * @param columnValue - Value to match
   * @param sheetName - Optional: Name of the sheet
   * @returns Array of matching rows
   */
  static filterByColumn(
    fileName: string,
    columnName: string,
    columnValue: string | number | boolean,
    sheetName?: string
  ): ExcelRow[] {
    const data = this.readExcelData(fileName, sheetName);
    const filtered = data.filter(row => row[columnName] === columnValue);
    
    if (filtered.length === 0) {
      log.warn(`No rows found with ${columnName} = ${columnValue}`);
    }

    return filtered;
  }

  /**
   * Get a specific cell value
   * @param fileName - Name of the Excel file
   * @param rowIndex - Index of the row
   * @param columnName - Name of the column
   * @param sheetName - Optional: Name of the sheet
   * @returns Cell value
   */
  static getCellValue(
    fileName: string,
    rowIndex: number,
    columnName: string,
    sheetName?: string
  ): string | number | boolean | undefined {
    const row = this.getRow(fileName, rowIndex, sheetName);
    return row[columnName];
  }

  /**
   * Get all values from a specific column
   * @param fileName - Name of the Excel file
   * @param columnName - Name of the column
   * @param sheetName - Optional: Name of the sheet
   * @returns Array of column values
   */
  static getColumnValues(
    fileName: string,
    columnName: string,
    sheetName?: string
  ): (string | number | boolean)[] {
    const data = this.readExcelData(fileName, sheetName);
    return data.map(row => row[columnName]).filter(val => val !== undefined);
  }

  /**
   * Get row count in the sheet
   * @param fileName - Name of the Excel file
   * @param sheetName - Optional: Name of the sheet
   * @returns Number of rows
   */
  static getRowCount(fileName: string, sheetName?: string): number {
    const data = this.readExcelData(fileName, sheetName);
    return data.length;
  }

  /**
   * Clear cache for specific file or all files
   * @param fileName - Optional: Name of specific file to clear
   */
  static clearCache(fileName?: string): void {
    if (fileName) {
      const keys = Array.from(this.dataCache.keys()).filter(key => key.startsWith(fileName));
      keys.forEach(key => this.dataCache.delete(key));
      log.info(`Cleared cache for: ${fileName}`);
    } else {
      this.dataCache.clear();
      log.info('Cleared all cache');
    }
  }

  /**
   * Get multiple rows by array of indices
   * @param fileName - Name of the Excel file
   * @param indices - Array of row indices
   * @param sheetName - Optional: Name of the sheet
   * @returns Array of row objects
   */
  static getRows(fileName: string, indices: number[], sheetName?: string): ExcelRow[] {
    const data = this.readExcelData(fileName, sheetName);
    return indices.map(index => {
      if (index < 0 || index >= data.length) {
        throw new Error(`Row index ${index} out of bounds`);
      }
      return data[index];
    });
  }

  /**
   * Get random row from data
   * @param fileName - Name of the Excel file
   * @param sheetName - Optional: Name of the sheet
   * @returns Random row object
   */
  static getRandomRow(fileName: string, sheetName?: string): ExcelRow {
    const data = this.readExcelData(fileName, sheetName);
    if (data.length === 0) {
      throw new Error('No data available to select random row');
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  /**
   * Verify if a value exists in a column
   * @param fileName - Name of the Excel file
   * @param columnName - Name of the column
   * @param value - Value to search for
   * @param sheetName - Optional: Name of the sheet
   * @returns Boolean indicating if value exists
   */
  static valueExistsInColumn(
    fileName: string,
    columnName: string,
    value: string | number | boolean,
    sheetName?: string
  ): boolean {
    const values = this.getColumnValues(fileName, columnName, sheetName);
    return values.includes(value);
  }

  /**
   * Get all data as an array
   * @param fileName - Name of the Excel file
   * @param sheetName - Optional: Name of the sheet
   * @returns Full array of row objects
   */
  static getAllData(fileName: string, sheetName?: string): ExcelRow[] {
    return this.readExcelData(fileName, sheetName);
  }
}
