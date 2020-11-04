import url from "url";
import { InternalServerError } from "../utils/customError";
import responseHandler from "../utils/responseHandler";
import {
  FacebookService,
  GitHubService,
  GoogleService,
  TwitterService,
} from "../services";

/**
 * Controller responsible for returning an authentication URL for the client
 * to initiate the Facebook's authentication flow.
 */
export const facebookController = (req, res, next) => {
  try {
    const facebookService = new FacebookService();
    facebookService.authenticate(req.provider, req.socialCallback);
    const authenticationUrl = facebookService.getAuthenticationUrl();

    responseHandler(res, 200, { authenticationUrl });
  } catch (error) {
    next(new InternalServerError(error));
  }
};

/**
 * Controller responsible for returning an authentication URL for the client
 * to initiate the GitHub's authentication flow.
 */
export const githubController = (req, res, next) => {
  try {
    const githubService = new GitHubService();
    githubService.authenticate(req.provider, req.socialCallback);
    const authenticationUrl = githubService.getAuthenticationUrl();

    responseHandler(res, 200, { authenticationUrl });
  } catch (error) {
    next(new InternalServerError(error));
  }
};

/**
 * Controller responsible for returning an authentication URL for the client
 * to initiate the Google's authentication flow.
 */
export const googleController = (req, res, next) => {
  try {
    const googleService = new GoogleService();
    googleService.authenticate(req.provider, req.socialCallback);
    const authenticationUrl = googleService.getAuthenticationUrl();

    responseHandler(res, 200, { authenticationUrl });
  } catch (error) {
    next(new InternalServerError(error));
  }
};

/**
 * Controller responsible for returning an authentication URL for the client
 * to initiate the Twitter's authentication flow.
 */
export const twitterController = async (req, res, next) => {
  try {
    const twitterService = new TwitterService();
    twitterService.authenticate(req.provider, req.socialCallback);
    const authenticationUrl = await twitterService.getAuthenticationUrl();

    responseHandler(res, 200, { authenticationUrl });
  } catch (error) {
    next(new InternalServerError(error));
  }
};

/**
 * Controller responsible for handling the callback from Facebook's authentication flow and
 * returning the user data to the client via a redirect to the client's provided
 * socialCallback.
 */
export const facebookCallbackController = async (req, res, next) => {
  try {
    // The state contains the client ID.
    const { state, code } = req.query;
    const facebookService = new FacebookService();
    const { profile, socialCallback } = await facebookService.getData(
      state.toString(),
      code
    );

    let redirectUrl;

    if (profile && profile.facebookId) {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: {
          success: true,
          id: profile.facebookId,
          isVerified: profile.isVerified,
          firstname: profile.firstname,
          lastname: profile.lastname,
          username: profile.username,
          email: profile.email,
          photo: profile.photo,
        },
      });
    } else {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: { success: false },
      });
    }

    res.redirect(redirectUrl);
  } catch (error) {
    next(new InternalServerError(error));
  }
};

/**
 * Controller responsible for handling the callback from GitHub's authentication flow and
 * returning the user data to the client via a redirect to the client's provided
 * socialCallback.
 */
export const githubCallbackController = async (req, res, next) => {
  try {
    // The state contains the client ID.
    const { state, code } = req.query;
    const githubService = new GitHubService();
    const { profile, socialCallback } = await githubService.getData(
      state.toString(),
      code
    );

    let redirectUrl;

    if (profile && profile.githubId) {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: {
          success: true,
          id: profile.githubId,
          isVerified: profile.isVerified,
          firstname: profile.firstname,
          lastname: profile.lastname,
          username: profile.username,
          email: profile.email,
          photo: profile.photo,
        },
      });
    } else {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: { success: false },
      });
    }

    res.redirect(redirectUrl);
  } catch (error) {
    next(new InternalServerError(error));
  }
};

/**
 * Controller responsible for handling the callback from Google's authentication flow and
 * returning the user data to the client via a redirect to the client's provided
 * socialCallback.
 */
export const googleCallbackController = async (req, res, next) => {
  try {
    // The state contains the client ID.
    const { state, code } = req.query;

    const googleService = new GoogleService();
    const { profile, socialCallback } = await googleService.getData(
      state.toString(),
      code
    );

    let redirectUrl;

    if (profile && profile.googleId) {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: {
          success: true,
          id: profile.googleId,
          isVerified: profile.isVerified,
          firstname: profile.firstname,
          lastname: profile.lastname,
          username: profile.username,
          email: profile.email,
          photo: profile.photo,
        },
      });
    } else {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: { success: false },
      });
    }

    res.redirect(redirectUrl);
  } catch (error) {
    next(new InternalServerError(error));
  }
};

/**
 * Controller responsible for handling the callback from Twitter's authentication flow and
 * returning the user data to the client via a redirect to the client's provided
 * socialCallback.
 */
export const twitterCallbackController = async (req, res, next) => {
  try {
    // The state contains the client ID.
    const { oauth_token, oauth_verifier } = req.query;

    const twitterService = new TwitterService();
    const { profile, socialCallback } = await twitterService.getData(
      oauth_token.toString(),
      oauth_verifier.toString()
    );

    let redirectUrl;

    if (profile && profile.twitterId) {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: {
          success: true,
          id: profile.twitterId,
          isVerified: profile.isVerified,
          firstname: profile.firstname,
          lastname: profile.lastname,
          username: profile.username,
          email: profile.email,
          photo: profile.photo,
        },
      });
    } else {
      redirectUrl = url.format({
        pathname: socialCallback,
        query: { success: false },
      });
    }

    res.redirect(redirectUrl);
  } catch (error) {
    next(new InternalServerError(error));
  }
};
