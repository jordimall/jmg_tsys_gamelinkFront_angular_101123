import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Tag } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-create-edit-tag',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-edit-tag.component.html',
  styleUrl: './create-edit-tag.component.css',
})
export class CreateEditTagComponent implements OnInit {
  id: any;
  tag: Tag = {};
  tagForm: FormGroup = new FormGroup({
    name: new FormControl(this.tag.name, Validators.required),
    description: new FormControl(this.tag.description, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tagService: TagService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idTag');

    if (this.findOutId()) {
      this.tagService.getTag(this.id).subscribe(
        (data) => {
          this.tagForm.setValue({
            name: data.name,
            description: data.description,
          });
        },
        (err) => {
          console.log({ status: err.status, messaje: err.message });
        }
      );
    }
  }

  public findOut() {
    this.tag = this.tagForm.value as Tag;
    if (this.findOutId()) {
      this.tagService.editTag(this.id, this.tag).subscribe(
        (data) => {
          this.messageService.setMessage('Tag edited successfully');
          this.location.back();
        },
        (err) => {
          console.log({ status: err.status, message: err.message });
        }
      );
    } else {
      this.tagService.addTag(this.tag).subscribe(
        (data) => {
          this.messageService.setMessage('Tag created successfully');
          this.location.back();
        },
        (err) => {
          console.log({ status: err.status, message: err.message });
        }
      );
    }
  }

  public findOutId = (): boolean => {
    return this.id !== null;
  };
}
