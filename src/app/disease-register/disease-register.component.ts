import { Component, Injectable,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs'
interface patient_infos {
  patient_id:string;
  patient_name: string;
  disease_kind: string;
  IsgetWell:boolean;
  spearding:boolean;
  onceagain:boolean;
  datatime:Date;
}

// @Injectable({ providedIn: 'root' })
// export class RandomUserService {
//    patient_info_api ="http://localhost:3000/patient/table";
//   this.http.get(patient_info_api)
//   // randomUserUrl = 'https://api.randomuser.me/';

//   // getUsers(
//   //   pageIndex: number,
//   //   pageSize: number,
//   //   sortField: string | null,
//   //   sortOrder: string | null,
//   //   filters: Array<{ key: string; value: string[] }>
//   // ): Observable<{ results: RandomUser[] }> {
//   //   let params = new HttpParams()
//   //     .append('page', `${pageIndex}`)
//   //     .append('results', `${pageSize}`)
//   //     .append('sortField', `${sortField}`)
//   //     .append('sortOrder', `${sortOrder}`);
//   //   filters.forEach(filter => {
//   //     filter.value.forEach(value => {
//   //       params = params.append(filter.key, value);
//   //     });
//   //   });
//   //   return this.http.get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params });
//   // }

//   constructor(private http: HttpClient) {}
// }
@Component({
  selector: 'app-disease-register',
  templateUrl: './disease-register.component.html',
  styleUrls: ['./disease-register.component.css']
})


export class DiseaseRegisterComponent implements OnInit {
  validateForm!: FormGroup;


  total = 1;
  patient_infos: patient_infos[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterGender = [
    { text: 'true', value: true },
    { text: 'false', value: false }
  ];
  
  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
  ): void {
    const tableapi ="http://localhost:3000/patient/table";
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body = JSON.stringify({
      page:pageIndex,
      pagesize:pageSize
    });
    this.loading = true;
    
    this.http.post(tableapi,body,httpOptions).subscribe((res)=>{
      if(res!==[]){
        var table_data:any=res;
        this.loading = false;
        this.total = 703;
        this.patient_infos=table_data;
      }

    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    // const currentSort = sort.find(item => item.value !== null);
    // const sortField = (currentSort && currentSort.key) || null;
    // const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize);
  }
  


//提交表单
  submitForm(value:Object):void{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(value)
    var api = "http://localhost:3000/patient/creat"
    this.http.post(api,value,httpOptions).subscribe((res)=>{
      if(res["msg"]==="sucessful"){
        console.log(res);
        alert("保存成功")
        this.validateForm.reset();
      }
      else alert("哎呀，出错了")

    })
  }
  // updateConfirmValidator(): void {
  //   /** wait for refresh value */
  //   Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  // }
  onfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  todelete(data:patient_infos):void{
    var deleteapi="http://localhost:3000/patient/todelete";
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const putbody={item:data.patient_id}
    this.http.put(deleteapi,putbody,httpOptions).subscribe((res)=>{
      if(res!==[]){
        const result:any=res;
        if('sucessful'===result["msg"]){
          this.loadDataFromServer(this.pageIndex, this.pageSize);
          this.countNum();
          alert("删除成功")
        }
        else alert("哎呀，出错了>_<")
        
      }
    })
  }

  countNum():void{
    var wellcountapi = "http://localhost:3000/patient"+"/wellcount";
    var patientcountapi ="http://localhost:3000/patient"+"/patientcount";
    this.http.get(wellcountapi).subscribe((res)=>{
      this.TotalGetWellNum=Number(res);
    })
    this.http.get(patientcountapi).subscribe((res)=>{
      this.TotalPatientNum=Number(res);
    })
  }
  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.http=http;
  }
  TotalGetWellNum = 0;
  TotalPatientNum = 0;
  ngOnInit(): void {
    this.countNum();
    this.loadDataFromServer(this.pageIndex, this.pageSize);

    //表单验证和默认值
    this.validateForm = this.fb.group({
      patient_name: [null, [Validators.required,Validators.maxLength(10)]],
      diseasename: [null, [Validators.required]],
      spearding:[false],
      IsgetWell:[false],
      onceagain:[false]
    });
  }
}
