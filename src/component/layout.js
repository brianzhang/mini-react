import { React } from '@/utils/base';
import {
  HeaderComponent,
  FooterComponent,
  ContentComponent,
} from './base';

export const LayoutComponent = (props) => {
  return (<div>
    <HeaderComponent />
    <ContentComponent children={props.children} />
    <FooterComponent />
  </div>)
}