import Invitation from '../view/invitation/index';
import User from '../view/user/index';
import Login from '../view/login/index';
import InvitationTemplate from '../view/invitation/InvitationTemplate';
import Category from '../view/invitation/category';



const routes = [
    { path: '/', name: 'login', element: <Login /> },
    { path: '/login', name: 'login', element: <Login /> },
    {
        path: '/invitation', name: 'invitation', element: <Invitation />,
        children: [
            { path: 'invitationTemplate', name: 'Invitation Template', element: < InvitationTemplate /> },
            { path: 'category', name: 'category', element: < Category /> },



        ]
    },
    {
        path: '/user', name: 'user', element: <User />,
        children: [

        ]
    },
];

export default routes;
