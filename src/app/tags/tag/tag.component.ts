import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tag } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent implements OnInit {
  numPage: number = 0;
  message: string = '';
  tagList: Tag[] | any;

  constructor(
    private tagService: TagService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.message = this.messageService.getMessage();
    this.tagService.allTagPaginate(this.numPage).subscribe(
      (data) => {
        this.tagList = data;
      },
      (err) => {
        console.log({ status: err.status, message: err.message });
      }
    );
  }

  deleteTag = (id: number): void => {
    console.log(id);
    this.tagService.deleteTag(id).subscribe(
      (data) => {
        this.messageService.setMessage('Tag successfully removed');
        this.ngOnInit();
      },
      (err) => {
        console.log({ status: err.status, message: err.message });
      }
    );
  };
}
