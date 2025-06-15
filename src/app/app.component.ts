import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import { CommonModule } from '@angular/common';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
  userAvatar: string;
  likes: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title = '小红书风格照片墙';
  photos: Photo[] = [];
  photoColumns: Photo[][] = [[], [], []]; // 默认3列瀑布流

  ngOnInit() {
    this.loadPhotos();
    this.distributePhotosToColumns();
  }

  loadPhotos() {
    // 模拟照片数据
    this.photos = [
      {
        id: 1,
        title: '春日野餐',
        description: '周末和朋友们一起去公园野餐，阳光正好，微风不燥',
        imageUrl: 'https://images.unsplash.com/photo-1526489550178-7bd5d9944f4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        userName: '阳光小妹',
        userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        likes: 328
      },
      {
        id: 2,
        title: '城市夜景',
        description: '灯火阑珊处，最美不过夜色中的城市天际线',
        imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        userName: '城市猎人',
        userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        likes: 456
      },
      {
        id: 3,
        title: '美食分享',
        description: '自制松饼配蓝莓酱，周末早餐的小确幸',
        imageUrl: 'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        userName: '吃货日记',
        userAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        likes: 215
      },
      {
        id: 4,
        title: '旅行日记',
        description: '背起行囊，走过山川大海，遇见最美的风景',
        imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        userName: '旅行者',
        userAvatar: 'https://randomuser.me/api/portraits/men/64.jpg',
        likes: 532
      },
      {
        id: 5,
        title: '咖啡时光',
        description: '一杯咖啡，一本书，一个安静的下午',
        imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        userName: '咖啡控',
        userAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        likes: 178
      },
      {
        id: 6,
        title: '宠物日常',
        description: '家有萌宠，生活中的小确幸',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        userName: '猫奴一枚',
        userAvatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        likes: 389
      }
    ];
  }

  distributePhotosToColumns() {
    // 将照片分配到不同列中以实现瀑布流效果
    this.photos.forEach((photo, index) => {
      const columnIndex = index % 3; // 3列瀑布流
      this.photoColumns[columnIndex].push(photo);
    });
  }
}
