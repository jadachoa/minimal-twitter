import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@radix-ui/react-icons"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { styled } from "@stitches/react"
import { useEffect, useState } from "react"

import { getStorage, setStorage } from "../../utilities/chromeStorage"

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  position: "relative",
  "&::after": {
    content: "",
    position: "absolute",
    inset: `min(
      0px,
      calc((100% - 2.25rem) / 2)
    )`
  },
  '&[data-state="unchecked"]': {
    backgroundColor: "transparent",
    border: "2px solid var(--twitter-accent-one)"
  }
})

export const CheckboxPromotedPosts = () => {
  const [userPromoted, setPromoted] = useState(true)

  useEffect(() => {
    const getUserDefaultPromoted = async () => {
      try {
        const userDefaultPromoted = await getStorage("removePromotedPosts")
        userDefaultPromoted &&
          setPromoted(userDefaultPromoted === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultPromoted()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label htmlFor="promotedPosts" className="text-base tracking-normal">
        Remove promoted posts
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={async (checked) => {
            setPromoted(checked)
            try {
              await setStorage({
                removePromotedPosts: checked ? "on" : "off"
              })
            } catch (error) {
              console.warn(error)
            }
          }}
          checked={userPromoted}
          id="removePromotedPosts"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxAlwaysShowLatest = () => {
  const [userLatest, setUserLatest] = useState(false)

  useEffect(() => {
    const getUserDefaultLatest = async () => {
      try {
        const userDefaultLatest = await getStorage("latestTweets")
        userDefaultLatest &&
          setUserLatest(userDefaultLatest === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultLatest()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label htmlFor="latestTweets" className="text-base tracking-normal">
        Always show latest tweets
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={async (checked) => {
            setUserLatest(checked)
            try {
              await setStorage({
                latestTweets: checked ? "on" : "off"
              })
            } catch (error) {
              console.warn(error)
            }
          }}
          checked={userLatest}
          id="latestTweets"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxTransparentSearch = () => {
  const [userTransparent, setUserTransparent] = useState(false)

  useEffect(() => {
    const getUserDefaultTransparent = async () => {
      try {
        const userDefaultTransparent = await getStorage("transparentSearch")
        userDefaultTransparent &&
          setUserTransparent(userDefaultTransparent === "on" ? true : false)

        // Check old "noBorders" value for existing extension users
        const userDefaultNoBordersOld = await getStorage("noBorders")
        if (
          typeof userDefaultNoBordersOld === "boolean" ||
          userDefaultNoBordersOld instanceof Boolean
        ) {
          setUserTransparent(true)
          await setStorage({
            transparentSearch: "on"
          })
        }
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultTransparent()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label htmlFor="transparentSearch" className="text-base tracking-normal">
        Transparent search bar
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={async (checked) => {
            setUserTransparent(checked)
            try {
              await setStorage({
                transparentSearch: checked ? "on" : "off"
              })
            } catch (error) {
              console.warn(error)
            }
          }}
          checked={userTransparent}
          id="transparentSearch"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideVanityCount = ({
  showVanityCheckboxes,
  setShowVanityCheckboxes,
  onCheckedChange,
  hideAll
}) => {
  return (
    <div className="flex items-center justify-between w-full py-1">
      <span className="flex items-center space-x-2 text-base tracking-normal text-black dark:text-white">
        <label htmlFor="hideVanityCount">Hide vanity counts</label>
        <TogglePrimitive.Root
          pressed={showVanityCheckboxes}
          onPressedChange={(pressed) => {
            setShowVanityCheckboxes(pressed)
          }}
          className="flex items-center"
        >
          {showVanityCheckboxes ? (
            <ChevronUpIcon className="mt-1" />
          ) : (
            <ChevronDownIcon />
          )}
        </TogglePrimitive.Root>
      </span>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("all", checked)}
          checked={hideAll}
          id="hideVanityCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideReplyCount = ({ onCheckedChange, hideReply }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideReplyCount" className="text-base">
        Hide reply count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("reply", checked)}
          checked={hideReply}
          id="hideReplyCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideRetweetCount = ({ onCheckedChange, hideRetweet }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideRetweetCount" className="text-base">
        Hide retweet count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("retweet", checked)}
          checked={hideRetweet}
          id="hideRetweetCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideLikeCount = ({ onCheckedChange, hideLike }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideLikeCount" className="text-base">
        Hide like count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("like", checked)}
          checked={hideLike}
          id="hideLikeCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideFollowCount = ({ onCheckedChange, hideFollow }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideFollowingCount" className="text-base">
        Hide follower/following count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("follow", checked)}
          checked={hideFollow}
          id="hideFollowCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}
