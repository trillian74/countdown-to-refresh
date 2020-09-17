declare interface ICountDownToRefreshWebPartStrings {
  AutoStartLabel: string;
  StartOnText: string;
  StartOffText: string;
  NowLoabel: string;
  WaitLabel: string;
  SubTitleLabel: string;
  TitleFieldLabel: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  MinutesToRefreshFieldLabel: string;
  SecondsToRefreshFieldLabel:string;
}

declare module 'CountDownToRefreshWebPartStrings' {
  const strings: ICountDownToRefreshWebPartStrings;
  export = strings;
}
