/** @format */

const axios = require("axios");

// Controller #1: get copies by postId, Controller #2: getTransferHistory using postId
const Copy = require("../models/copyModel");
const { subgraphURL } = require("./../utils/common");

const getCopyByPostID = async (req, res) => {
  try {
    const copy = await Copy.find({ postId: req.param.postId });
    if (!copy) {
      throw new Error("no copy made");
    }
    res.json({
      data: copy,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTransferHistory = async (req, res) => {
  try {
    /**
     * 1: get postId from params
     * 2: fetch all transfers of this tokenId
     * 3: filter out duplicate address and store them in an array
     * 4: fetch user profiles from subgraph `accountCreateds` query
     * 5: model return Array objects as {tokenId: Number, tranactionHash: string, from: Profile, to: Profile}
     * 6: return response to client
     */
    //  1
    const { postId } = req.params;

    //  2
    const result = await axios.post(subgraphURL, {
      query: `{
        transfers(where: {tokenId: ${postId}}) {
            id,
            to,
            from,
            transactionHash,
            tokenId
        }
      }`,
    });
    const transfers = result.data.data.transfers;

    // 3
    const addresses = {};
    transfers.forEach(({ from, to }) => {
      addresses[from] = from;
      addresses[to] = to;
    });

    console.log(addresses);
    const addressesArray = Object.keys(addresses);

    //  4. fetching user Profile data from subgraph
    const userProfile = (user) =>
      axios.post(subgraphURL, {
        query: `
        {
            accountCreateds(where: {user: ${user}}) {
                bio
                displayName
                image
                user
                userName
            }
        }
        `,
      });
    const usersProfileresponse = await Promise.all(
      addressesArray.filter((address) => {
        return userProfile(address);
      })
    );

    const userProfiles = usersProfileresponse.data.data.accountCreateds;

    //    5
    const transferHistory = transfers.filter((transfer) => {
      //tokenId, from, to, transactionHash
      const fromUserProfile = usersProfileresponse.find((profile) => profile.user === transfer.from || profile.user === transfer.to);
      const toUserProfile = usersProfileresponse.find((profile) => profile.user === transfer.from || profile.user === transfer.to);
      return {
        tokenId,
        transactionHash,
        from: fromUserProfile,
        to: toUserProfile,
      };
    });

    //  6 return response
    res.status(200).json({ data: transferHistory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCopyByPostID, getTransferHistory };
