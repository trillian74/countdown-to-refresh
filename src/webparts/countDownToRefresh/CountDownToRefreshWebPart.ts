import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {CoundDownToRefresh} from "./components/CountDownToRefresh";
import * as strings from 'CountDownToRefreshWebPartStrings';
import { ICountDownToRefreshProps } from './components/ICountDownToRefreshProps';

export interface ICountDownToRefreshWebPartProps {
  minutes: number;
  seconds:number;
  autostart:boolean;
}

export default class CountDownToRefreshWebPart extends BaseClientSideWebPart<ICountDownToRefreshWebPartProps> {

  public render(): void {
    if(this.properties.minutes === undefined){
      this.properties.minutes = 0;
    }
    if(this.properties.seconds === undefined){
      this.properties.seconds = 60;
    }
    if(this.properties.autostart === undefined){
      this.properties.autostart = true;
    }
    const element: React.ReactElement<ICountDownToRefreshProps> = React.createElement(
      CoundDownToRefresh,
      {
        minutes: this.properties.minutes,
        seconds: this.properties.seconds,
        autostart: this.properties.autostart
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('minutes', {
                  label: strings.MinutesToRefreshFieldLabel
                },),
                PropertyPaneTextField('seconds', {
                  label: strings.SecondsToRefreshFieldLabel
                },),
                PropertyPaneToggle('autostart', {
                  label: strings.AutoStartLabel,
                  onText: strings.StartOnText,
                  offText: strings.StartOffText,
                },),
              ]
            }
          ]
        }
      ]
    };
  }
}
