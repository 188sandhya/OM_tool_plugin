#!/usr/bin/env bash
set -eo pipefail

function main {
  case "${1:-}" in

  setup) setup;;
  deploy-local) deployLocal;;
  *)
    help
    exit 1
    ;;
  esac
}

function help {
  echo "Usage:"
  echo " setup                                      setup project so all npm libraries are downloaded"
  echo " deploy-local                               build plugin, apply to already build oma image and restart grafana pods"
  echo
}

function setup {
  echoGreenText 'Setting up plugin...'
  npm i
  echoBlueText '... finished.'
}

function deployLocal {
  echoGreenText 'Deploying plugin...'
  npm run build
  docker build -t eb2/eb-grafana .
  kubectl -n minikube delete pod -l app=grafana
  echoBlueText '... finished.'
}

function echoGreenText {
  if [[ "${TERM:-dumb}" == "dumb" ]]; then
    echo "${@}"
  else
    RESET=$(tput sgr0)
    GREEN=$(tput setaf 2)

    echo "${GREEN}${@}${RESET}"
  fi
}

function echoBlueText {
  if [[ "${TERM:-dumb}" == "dumb" ]]; then
    echo "${@}"
  else
    RESET=$(tput sgr0)
    BLUE=$(tput setaf 4)

    echo "${BLUE}${@}${RESET}"
  fi
}
function echoRedText {
  if [[ "${TERM:-dumb}" == "dumb" ]]; then
    echo "${@}"
  else
    RESET=$(tput sgr0)
    RED=$(tput setaf 1)

    echo "${RED}${@}${RESET}"
  fi
}

function echoWhiteText {
  if [[ "${TERM:-dumb}" == "dumb" ]]; then
     echo "${@}"
  else
    RESET=$(tput sgr0)
    WHITE=$(tput setaf 7)

    echo "${WHITE}${@}${RESET}"
  fi
}

if [[ "${TEST_MODE:-}" = "" ]]; then
  main "$@"
fi