import {MessageEvent} from "./messageEvent"
import {FollowEvent} from "./FollowEvent"
import {UnfollowEvent} from "./UnfollowEvent"
import {IgnoredEvent} from "./IgnoredEvent"
import {PostbackEvent} from "./postbackEvent"

export type LineWebhookEvent = MessageEvent | FollowEvent | UnfollowEvent | IgnoredEvent | PostbackEvent