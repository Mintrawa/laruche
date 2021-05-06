export interface CONFIG {
  WSS: string
  ACCOUNT: string
  KEYS: {
    posting: string
  },
  TAGS: string[],
  COMMUNITIES: string[],
  LANGS: string[]
  ACCOUNTS: string[]
}

export interface AUTH {
  action:     'authentication'
  account:    string
  key:        'active'|'posting'|'signing'
  signature?: string
}

export interface POST_MSG {
  action: 'join'|'disconnect'
  data: {
    tags:      string[],
    community: string[],
    lang:      string[]
  }
}

export interface POST_DATA {
  author:            string
  author_reputation: number
  author_new:        boolean
  title:             string
  permlink:          string
  category:          string
  tags:              string[]
  dapp: {
    name:    string
    version: string
  },
  nb_comment:       number
  nb_vote:          number
  active_votes:     [ rshares: string, voter: string ]
  payout:           number
  payout_accpeted:  boolean
  beneficiaries:    [account: string, weight: number]
  community?:       string
  community_title?: string

  nb_images: number
  nbe_words: number
  language:  string[]

  created:          Date
  updated:          Date
}

export interface REWARD_MSG {
  action:   'join'|'disconnect'
  accounts: string[]
}

export interface REWARD_DATA {
  rewards: [{
    author:   string
    permlink: string
    payout:   number
  }]
}

