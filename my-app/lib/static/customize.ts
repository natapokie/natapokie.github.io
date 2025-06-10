import { StaticImageData } from 'next/image';
import todo from '@/public/todo.jpg';

interface ICustomizeOption {
  label?: string;
  img?: StaticImageData;
}

export const CustomizationOptions = [
  {
    label: 'Hairstyle',
    options: [
      {
        label: 'short black',
        img: todo,
      },
      {
        label: 'purple bob',
        img: todo,
      },
      {
        label: 'black mid',
        img: todo,
      },
      {
        label: 'black long with highlights',
        img: todo,
      },
    ],
  },
  {
    label: 'Shirt',
    options: [
      {
        label: 'default',
        img: todo,
      },
    ],
  },
  {
    label: 'Accessories',
    options: [
      // {
      //   label: 'default',
      //   img: todo,
      // }
    ],
  },
];
