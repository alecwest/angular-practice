import {
    Action,
    Reducer,
    Store,
    createStore
  } from 'redux';

interface AppState {
    messages: String[];
}

interface AddMessageAction extends Action {
    message: string;
}

interface DeleteMessageAction extends Action {
    index: number;
}

let initialState: AppState = { messages: [] };
let reducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                messages: state.messages.concat(
                    (<AddMessageAction>action).message
                ),
            };
        case 'DELETE_MESSAGE':
            let idx = (<DeleteMessageAction>action).index;
            return {
                messages: [
                    ...state.messages.slice(0, idx),
                    ...state.messages.slice(idx + 1, state.messages.length)
                ],
            };
    }
};

class MessageActions {
    static addMessage(message: string): AddMessageAction {
        return {
            type: 'ADD_MESSAGE',
            message: message
        };
    }
    static deleteMessage(index: number): DeleteMessageAction {
        return {
            type: 'DELETE_MESSAGE',
            index: index
        };
    }
}

let store = createStore<AppState>(reducer);
console.log(store.getState());

store.dispatch(
    MessageActions.addMessage('Would you say the fringe was made of silk?')
);

store.dispatch(
    MessageActions.addMessage('Wouldn\'t have no other kind but silk')
);

store.dispatch(
    MessageActions.addMessage('Has it really got a team of snow white horses?')
);

console.log(store.getState());
