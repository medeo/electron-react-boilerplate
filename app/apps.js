import { v4 } from 'uuid';

const apps = [{
  name: 'kligo',
  uri: '/record',
  isActive: true,
  id: v4(),
  isFav: true,
}, {
  name: 'cotation',
  uri: '/quotations',
  isActive: true,
  id: v4(),
  isFav: true
}, {
  name: 'app test 2',
  uri: '/lolilol',
  isActive: true,
  id: v4(),
  isFav: false
}
];


export default apps;
