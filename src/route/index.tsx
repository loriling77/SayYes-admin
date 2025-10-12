
import User from '../view/user/index';
import Login from '../view/login/index';
import InvitationTemplate from '../view/invitation/invitationTemplate/index';
import Category from '../view/invitation/category/index';



const routes = [
    { path: '/', name: 'login', element: <Login /> },
    { path: '/login', name: 'login', element: <Login /> },
    {
        path: '/invitation', name: 'invitation',
        children: [
            { path: 'invitationTemplate', name: 'invitation Template', element: < InvitationTemplate /> },
            { path: 'category', name: 'category', element: < Category /> },



        ]
    },
    {
        path: '/user', name: 'user', element: <User />,

    },
];

export default routes;
