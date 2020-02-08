import Vue from 'vue'

import { Button, 
  Form, 
  FormItem, 
  Input, 
  Message,Container, 
  Header,Main, 
  Aside, 
  Menu, 
  Submenu, 
  MenuItem, 
  Breadcrumb, 
  BreadcrumbItem,
  Card,
  Tag,
  Table,
  TableColumn,
  Dialog,
  Select,
  Option,
  Pagination,
  MessageBox
} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm