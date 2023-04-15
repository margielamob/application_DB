import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Member } from '../../../../../common/tables/member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  memberName: string;
  membersFound: Member[];
  constructor(private http: CommunicationService) { }

  searchMemberByName() {
    this.http.searchMembersByName(this.memberName).subscribe((data: Member[]) => {
      this.membersFound = data;
    });
  }
}
