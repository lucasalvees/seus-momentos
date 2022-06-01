import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ComentService } from 'src/app/services/coment.service';
import { Moment } from 'src/app/Moment';
import { Coment } from 'src/app/Coment';
import { environment } from 'src/environments/environment';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faEdit = faEdit;
  faTrash = faTrash;

  comentForm!: FormGroup;

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private comentService: ComentService,
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));

    this.comentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.comentForm.get('text')!;
  }

  get username() {
    return this.comentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluído com sucesso!");

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.comentForm.invalid) {
      return;
    }

    const data: Coment = this.comentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.comentService.createComment(data).subscribe((coment) => this.moment!.comments!.push(coment.data));

    this.messagesService.add("Comentário adicionado");

    //reset form
    this.comentForm.reset();

    formDirective.resetForm();
  }

}
