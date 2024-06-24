import { ReactNode } from "react";

export interface StrategVariation {
  variationLabel: string;
  fetchURL: string;
}

export interface StrategyButtonProps {
  strategyName: string;
  variations: StrategVariation[];
}

interface Fund {
  __typename: string;
  name: string;
  marketCode: string;
  lastPrice: number;
  lastPriceDate: string;
  ongoingCharge: number;
  sectorName: string;
  currency: string;
}

interface Profile {
  objective: string;
}

interface Rating {
  analystRating: number;
  SRRI: number;
  analystRatingLabel: string;
}

interface Document {
  id: string;
  type: string;
  url: string;
}

interface Asset {
  label: string;
  value: number;
}

interface Holding {
  name: string;
  weighting: number;
}

interface Portfolio {
  asset: Asset[];
  top10Holdings: Holding[];
}

export interface Data {
  quote: Fund;
  profile: Profile;
  ratings: Rating;
  documents: Document[];
  portfolio: Portfolio;
}

export interface RootObject {
  data: Data;
}

export const defaultEmptyData: Data = {
  quote: {
    __typename: "",
    name: "",
    marketCode: "",
    lastPrice: 0,
    lastPriceDate: "",
    ongoingCharge: 0,
    sectorName: "",
    currency: "",
  },
  profile: {
    objective: "",
  },
  ratings: {
    analystRating: 0,
    SRRI: 0,
    analystRatingLabel: "",
  },
  documents: [
    {
      id: "",
      type: "",
      url: "",
    },
  ],
  portfolio: {
    asset: [
      {
        label: "",
        value: 0,
      },
    ],
    top10Holdings: [
      {
        name: "",
        weighting: 0,
      },
    ],
  },
};

export interface MeasureBarProps {
  rating: number | null;
}


export interface StarRatingProps {
  rating: number;
  highestPossibleRating?: number;
}

export interface HeroProps {
  children?: ReactNode;
}

export interface InformationConsoleProps {
  children?: ReactNode;
}