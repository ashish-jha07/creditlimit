import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import * as ExcelJS from 'exceljs';
import * as CryptoJS from 'crypto-js';
import * as XLSX from 'xlsx';
//const XLSX = require('xlsx')
import * as fs from 'file-saver';
import * as moment from 'moment';
import { size } from 'lodash';
import { Console } from 'console';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  encryptKey: string = '01512142231412152252322123246222';

  constructor() { }

  decrypt(data: string, key: string = this.encryptKey): string {
    return AES.decrypt(data, key).toString(enc.Utf8);
  }
  encryptWithCryptoJS(plainText: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.encryptKey);
    const iv1 = CryptoJS.enc.Utf8.parse("tEi1H3E1aj26XNro");
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      keySize: 128 / 8,
        iv: iv1,
        mode: CryptoJS.mode.CBC
       // padding: CryptoJS.pad.Pkcs7
    });

    return encrypted + "";
}
decryptionWithCryptoJS(cipher: string): string {
  const key = CryptoJS.enc.Utf8.parse(this.encryptKey);
  const iv1 = CryptoJS.enc.Utf8.parse("tEi1H3E1aj26XNro");
  const plainText = CryptoJS.AES.decrypt(cipher, key, {
    keySize: 128 / 8,
        iv: iv1,
        mode: CryptoJS.mode.CBC
   //   padding: CryptoJS.pad.Pkcs7
  });

  return plainText.toString(CryptoJS.enc.Utf8);
}
  decryptb(data: string, keyinput: string = this.encryptKey): string {
    let key = CryptoJS.enc.Utf8.parse(keyinput);
    let iv = CryptoJS.enc.Utf8.parse('tEi1H3E1aj26XNro');

    let ecryptdata = CryptoJS.AES.decrypt(data, key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC
      }).toString();
    return ecryptdata;
  }
  // decrypta(data1: string, key: string = this.encryptKey): string {
  //   data:any = "015121422314121522523221232462222872135229221522512611161222222225131415";
  //   key = "tEi1H3E1aj26XNro";
    
  //   // Decode the base64 data so we can separate iv and crypt text.
  //   var rawData = atob(data);
  //   var iv = btoa(rawData.substring(0,16));
  //   var crypttext = btoa(rawData.substring(16));
    
  //   // Decrypt...
  //   var plaintextArray = CryptoJS.AES.decrypt(
  //     {
  //       ciphertext: CryptoJS.enc.Base64.parse(data1),
  //       salt: ""
  //     },
  //     CryptoJS.enc.Hex.parse(key),
  //     { iv: CryptoJS.enc.Base64.parse(iv) }
  //   );
  //   return AES.decrypt(data, key).toString(enc.Utf8);
  // }
  encrypta(data: string, keyinput: string = this.encryptKey): string {
    let key = CryptoJS.enc.Utf8.parse(keyinput);
    let iv = CryptoJS.enc.Utf8.parse('tEi1H3E1aj26XNro');
   // CryptoJS.enc.Utf8.parse(data)
   //JSON.stringify({ data })
    let ecryptdata = CryptoJS.AES.encrypt( CryptoJS.enc.Utf8.parse(data), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC
      }).toString();
    return ecryptdata;
  //  return AES.encrypt(data, key).toString();
  }
  encrypt(data: string, key: string = this.encryptKey): string {
    return AES.encrypt(data, key).toString();
  }

  randomNumber(digit: number = 60000) {
    return Math.floor(100000 + Math.random() * digit);
  }
  numShort(value:any) {
    let val: any = Math.abs(value);
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(1) + 'C';
    } else if (val >= 1000) {
      val = (val / 100000).toFixed(1) + 'L';
    }
    //  else if (val >= 1000) {
    //   val = (val / 1000).toFixed(1) + 'K';
    // }
    return val;
  }

  getDownloadkit(headerArray: any, name: any) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(name, { views: [{  state: 'frozen' , ySplit: 1 }] });
    let headerRow = worksheet.addRow(headerArray);
    worksheet.columns.forEach((cell,index)=>{
      cell.width =25
    })
    headerRow.eachCell(function (cell: ExcelJS.Cell) {
      
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCE4D6' },
      
      };

      // cell.font = { name: 'Arial', size: 20};
      cell.alignment = { horizontal: 'center' };
      cell.border = {
        top: { style: "thin",  },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }

      };
      
      if (cell.name == headerArray[headerArray.length - 1].header) {
        return;
      }
    });

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name + '.xlsx';
      a.click();
    })


  }
  getDownloadFileWithData(headerArray: any, data: any, name: any) {
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sales Projection');
    let headerRow = worksheet.addRow(headerArray);

    // worksheet.columns = headerArray;
    // let count = 1;
    // let row = worksheet.getRow(1);
    headerRow.eachCell(function (cell: ExcelJS.Cell, index) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCE4D6' }
      };
      // cell.font = { name: 'Arial', size: 20};
      // cell.col.endsWith = {width: 20}
      cell.alignment = { horizontal: 'center' };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }

      };
      worksheet.getColumn(index).width = headerArray[index - 1].length < 20 ? 20 : headerArray[index - 1].length;

      if (cell.name == headerArray[headerArray.length - 1].header) {
        return;
      }
    });
   
    for (let item of data) {
    
      worksheet.addRow(item);
    }
  //  let blob : any;
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
     
      const a = document.createElement('a');
      a.href = url;
      a.download = name + '.xlsx';
      a.click();
    })
   // fs.saveAs(blob, name + '.xlsx');


  }
  getDownloadSapFileWithData(headerArray: any, data: any, name: any) {
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sap_Upload_'+new Date().toISOString().split('T')[0]);
    let headerRow = worksheet.addRow(headerArray);

    // worksheet.columns = headerArray;
    // let count = 1;
    // let row = worksheet.getRow(1);
    headerRow.eachCell(function (cell: ExcelJS.Cell, index) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCE4D6' }
      };
      // cell.font = { name: 'Arial', size: 20};
      // cell.col.endsWith = {width: 20}
      cell.alignment = { horizontal: 'center' };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }

      };
      worksheet.getColumn(index).width = headerArray[index - 1].length < 20 ? 20 : headerArray[index - 1].length;

      if (cell.name == headerArray[headerArray.length - 1].header) {
        return;
      }
    });
   
    for (let item of data) {
    
      worksheet.addRow(item);
    }
  //  let blob : any;
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
     
      const a = document.createElement('a');
      a.href = url;
      a.download = name+"_"+(new Date().toISOString().slice(0,10))+"_"+(new Date().toISOString().slice(12,14))+ '.xlsx';
      a.click();
    })
   // fs.saveAs(blob, name + '.xlsx');


  }
  readExcelFile = async ( file: any, cb: any ) =>
  {
  
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer( file );
  
      fileReader.onload = ( e: any ) =>
      {
          const bufferArray = e.target.result;
  
          const wb = XLSX.read( bufferArray, { type: "buffer" } );
  
          const wsname = wb.SheetNames[0];
  
          const ws = wb.Sheets[wsname];
  
          const data = XLSX.utils.sheet_to_json(ws);
          // console.log(data);
          cb(data);
      }
  
  }



  readExcelFiles = async ( file: any, cb: any ) =>
  {

    // const target = e.target.result;
    // const wb = XLSX.read(target,{type:'binary',cellText:false,cellDates:true});
    // const wsname = wb.SheetNames[0];
    // const ws = wb.Sheets[wsname];
    // const data = XLSX.utils.sheet_to_json(ws, {header:1,raw:false,dateNF:'yyyy-mm-dd'});
  
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer( file );
  
      fileReader.onload = ( e: any ) =>
      {
          const bufferArray = e.target.result;
          // {convert_float=False, dtype='str'}
          const wb = XLSX.read( bufferArray, {type:'buffer'} );
  
          const wsname = wb.SheetNames[0];
  
          const ws = wb.Sheets[wsname];
  
          const data = XLSX.utils.sheet_to_json(ws);
          console.log(data , "read excel");

          // console.log(new Date(10/31/94));
          console.log();
          
          
          cb(data);
      }
  
  }
  



  readExcelFileKey = async ( file: any, keys:any, cb: any ) =>
  {
    debugger
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer( file );
  
      fileReader.onload = ( e: any ) =>
      {
          const bufferArray = e.target.result;
          debugger
          console.log("sunil111 bufferArray"+bufferArray);

          const wb = XLSX.read( bufferArray, { type: "buffer" } );
          console.log("sunil111"+wb);
          const wsname = wb.SheetNames[0];
  //console.log("sunil"+wsname);
          const ws = wb.Sheets[wsname];
        //  console.log(ws);
          const data = XLSX.utils.sheet_to_json(ws);
          console.log("sunil"+data);
          // console.log(data);
          cb(data);
      }
  
  }

  convertLocalDateToUTCIgnoringTimezone(date: Date) {
    const timestamp = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    );
  
    return new Date(timestamp);
  }
  
  convertUTCToLocalDateIgnoringTimezone(utcDate: Date) {
    return new Date(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth(),
      utcDate.getUTCDate(),
      utcDate.getUTCHours(),
      utcDate.getUTCMinutes(),
      utcDate.getUTCSeconds(),
      utcDate.getUTCMilliseconds(),
    );
  }

  getDateOnly(dateData: Date ){

  }

    CHART_COLORS : any = {
    1: 'rgb(255, 99, 132)',
    2: 'rgb(255, 159, 64)',
    3: 'rgb(255, 205, 86)',
    4: 'rgb(75, 192, 192)',
    5: 'rgb(54, 162, 235)',
    6: 'rgb(153, 102, 255)',
    7: 'rgb(201, 203, 207)'
  };
   COLORS :string[] = [
    '#F86624',
    '#43BCCD',
    '#F9C80E',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
  ];
  arrayColor(index: any) {
    let colorArray : any = [];
    for (let i = 1; i<= index; i++){
      colorArray.push(this.CHART_COLORS[i]);
    }
    return colorArray;
  }



  downloadMasters(headerArray: any, data: any, name: any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(name);
    let headerRow = worksheet.addRow(headerArray);
    headerRow.eachCell(function (cell: ExcelJS.Cell, index) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCE4D6' }
      };

      cell.alignment = { horizontal: 'center' };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }

      };
      worksheet.getColumn(index).width = headerArray[index - 1].length < 20 ? 20 : headerArray[index - 1].length;

      if (cell.name == headerArray[headerArray.length - 1].header) {
        return;
      }
    });
   
    for (let item of data) {
    
      worksheet.addRow(item);
    }


     /*Save Excel File*/
     workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      fs.saveAs(blob, name + EXCEL_EXTENSION);
  });
  
 

  }

  getUTCDate = (date: Date): Date => {
    const utcDate = new Date(date.getTime());
    utcDate.setHours(0, -date.getTimezoneOffset(), 0, 0);
    return utcDate;
  };
}
