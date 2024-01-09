import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contacts.service';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact-list/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  model = <Contact>{};
  submitted = false;
  btnName = 'Submit';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    if (this.contactService.getContact$) {
      this.contactService.getContact$.subscribe((data: Contact) => {
        if (data) {
          this.model = { ...data };
          this.btnName = 'Save';
        }
      });
    }
  }

  createNew() {
    return {} as Contact;
  }

  onSubmit(contactForm: NgForm) {
    this.submitted = true;
    if (this.btnName == 'Save') {
      this.contactService.putContact({ ...this.model }).subscribe((contact) => {
        this.model = this.createNew();
        this.submitted = false;
        contactForm.resetForm();
        this.btnName = 'Submit';
      });
    } else {
      this.contactService
        .postContact({ ...this.model })
        .subscribe((contact) => {
          console.log('object saved', contact);
          this.submitted = false;
          this.model = this.createNew();
          contactForm.resetForm();
          this.btnName = 'Submit';
        });
    }

    console.log('submitted');
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
