import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tag } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent implements OnInit {
  numPage: number = 0;
  tagList: Tag[] | any;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
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
  };
}
