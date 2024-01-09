import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contacts.service';
import { Contact } from './contact';
import { updatePlaceholderMap } from '@angular/compiler/src/render3/view/i18n/util';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService],
})
export class ContactsComponent implements OnInit {
  public contacts = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.readAll();
  }

  private enableEdit(contact: any) {
    this.contactService.setContact(contact);
  }

  private readAll() {
    return this.contactService.loadAll().subscribe((list) => {
      this.contacts = list;
    });
  }
  private deleteContact(id: number) {
    // this.contacts.splice(id, 1);
    // this.contactService.deleteContact(id).subscribe();
  }
}
