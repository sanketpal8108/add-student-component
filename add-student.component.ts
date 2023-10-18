import { Component } from '@angular/core';
import { ModalDismissReasons,NgbDatepicker,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentData:any;
  addStudent = new FormGroup({
    rollNo: new FormControl(''),
    name: new FormControl(''),
    email:new FormControl(''),
    age:new FormControl(''),
    date:new FormControl(''),
    isMale: new FormControl('')
  })

  isMaleSelected= false
  isFemaleSelected= false
  //content = document.getElementById("content");
  closeResult = '';
  tempNumber=1

	constructor(private studentInfo:StudentService,private modalService: NgbModal,private router:Router,private location:Location) {
    //this.openAdd()
  }
  addNewStudent(data:any){
    this.studentInfo.addStudent(data).subscribe({
      next:(result)=>{
        alert("new Student Added Successfully")
        location.reload();
        console.log(result)
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse)
      }
    })
    console.log(data)
  }
	openAdd(content:any) {
    
    if(this.tempNumber==1){
      //debugger
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
    this.tempNumber++	
    console.log(this.tempNumber)
	}
  

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  allStudent() {
    this.router.navigateByUrl('/')
    //this.location.back()
  }
}
