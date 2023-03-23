import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {


  roomList!: Room[];
  onChangedSub!: Subscription;

  constructor(private readonly _roomService: RoomService) {
  }

  ngOnInit(): void {
    // this.loadRooms();
    this.onChangedSub = this._roomService.$roomChanged.subscribe( () => this.loadRooms() )
  }
  
  ngOnDestroy(): void {
    this.onChangedSub.unsubscribe();
  }

  loadRooms(){
    this._roomService.getAll().subscribe({
      next: data => this.roomList = data,
      error: console.error
    });
  }

  
}
