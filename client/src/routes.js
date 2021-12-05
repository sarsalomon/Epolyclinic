import AddDepartment from "./pages/admin/add/AddDepartment"
import AddDoctor from "./pages/admin/add/AddDoctor"
import AddNeighBorhood from "./pages/admin/add/AddNeighBorhood"
import AddPatient from "./pages/admin/add/AddPatient"
import AdminDashboard from "./pages/admin/AdminDashboard"
import UpdateDepartment from "./pages/admin/update/UpdateDepartment"
import UpdateDoctor from "./pages/admin/update/UpdateDoctor"
import Department from "./pages/admin/view/Department"
import Doctor from "./pages/admin/view/Doctor"
import Auth from "./pages/Auth"
import DoctorDashboard from "./pages/doctor/DoctorDashboard"
import NotFounded from "./pages/NotFounded"
import EndReception from "./pages/reception/EndReception"
import ReceptionDashboard from "./pages/reception/ReceptionDashboard"
import PatientUpdate from "./pages/reception/update/PatientUpdate"
import Redirects from "./pages/Redirects"
import { ADD_DEPARTMENT_ROUTE, ADD_DOCTOR_ROUTE, ADD_MFY_ROUTE, ADD_PATIENT_ROUTE, ADMIN_DASHBOARD_ROUTE, DEPARTMENTS_ROUTE, DOCTORS_ROUTE, DOCTOR_DASHBOARD_ROUTE, END_RECEPTION_ROUTE, GET_DEPARTMENT_ROUTE, GET_DOCTOR_ROUTE, GET_PATIENT_ROUTE, LOGIN_ROUTE, NOTFOUNDED_ROUTE, RECEPTION_DASHBOARD_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Redirects
    },
    {
        path: ADMIN_DASHBOARD_ROUTE,
        Component: AdminDashboard
    },
    {
        path: DEPARTMENTS_ROUTE,
        Component: Department
    },
    {
        path: DOCTORS_ROUTE,
        Component: Doctor
    },
    {
        path: ADD_DEPARTMENT_ROUTE,
        Component: AddDepartment
    },
    {
        path: ADD_DOCTOR_ROUTE,
        Component: AddDoctor
    },    
    {
        path: ADD_PATIENT_ROUTE,
        Component: AddPatient
    },
    {
        path: ADD_MFY_ROUTE,
        Component: AddNeighBorhood
    },
    {
        path: GET_DEPARTMENT_ROUTE + '/:id',
        Component: UpdateDepartment
    },
    {
        path: GET_DOCTOR_ROUTE + '/:id',
        Component: UpdateDoctor
    },
    {
        path: GET_PATIENT_ROUTE + '/:id',
        Component: PatientUpdate
    },
    {
        path: DOCTOR_DASHBOARD_ROUTE,
        Component: DoctorDashboard
    },
    {
        path: RECEPTION_DASHBOARD_ROUTE,
        Component: ReceptionDashboard
    },
    {
        path: END_RECEPTION_ROUTE,
        Component: EndReception
    },
    {
        path:NOTFOUNDED_ROUTE,
        Component: NotFounded
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: NOTFOUNDED_ROUTE,
        Component: NotFounded
    }
]