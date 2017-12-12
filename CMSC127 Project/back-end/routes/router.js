const router = require('express').Router();
const StudentController = require('../controllers/student-controller')
const AdviserController = require('../controllers/adviser-controller')
const OtherController = require('../controllers/other-controller')
const PaperController = require('../controllers/paper-controller')
const PaperTopicController = require('../controllers/paper-topic-controller')
const AssignedAdviserController = require('../controllers/assigned-adviser-controller')
const CoAuthorController = require('../controllers/coauthor-controller')
const ReportController = require('../controllers/report-controller')
const PanelController = require('../controllers/panel-controller')

//Student
router.get('/get-all-students', StudentController.getAllStudents);
router.get('/get-all-student-number', StudentController.getAllStudentNumbers);
router.post('/insert-student', StudentController.insertStudent);
router.post('/delete-student', StudentController.deleteStudent);
router.post('/update-student', StudentController.updateStudent);
router.post('/get-student-by-student-number', StudentController.getStudentByStudentNumber);
router.post('/get-student-by-course', StudentController.getStudentByCourse);
router.post('/get-student-by-college', StudentController.getStudentByCollege);
router.post('/get-student-by-first-name', StudentController.getStudentByFirstName);
router.post('/get-student-by-middle-name', StudentController.getStudentByMiddleName);
router.post('/get-student-by-last-name', StudentController.getStudentByLastName);

//Advisers
router.get('/get-all-advisers', AdviserController.getAllAdvisers);
router.get('/get-all-faculty_id', AdviserController.getAllFacultyId);
router.post('/insert-adviser', AdviserController.insertAdviser);
router.post('/delete-adviser', AdviserController.deleteAdviser);
router.post('/update-adviser', AdviserController.updateAdviser);
router.post('/get-adviser-by-college', AdviserController.searchCollegeAdviser);
router.post('/get-adviser-by-first-name', AdviserController.searchFnameAdviser);
router.post('/get-adviser-by-middle-name', AdviserController.searchMnameAdviser);
router.post('/get-adviser-by-last-name', AdviserController.searchLnameAdviser);
router.post('/get-adviser-by-faculty-position', AdviserController.searchPositionAdviser);
router.post('/get-adviser-by-department', AdviserController.searchDeptAdviser);
router.post('/get-adviser-by-faculty-id', AdviserController.searchIdAdviser);


//Papers
router.get('/get-all-papers', PaperController.getAllPapers);
router.post('/insert-paper', PaperController.insertPaper);
router.post('/delete-paper', PaperController.deletePaper);
router.post('/update-paper', PaperController.updatePaper);
router.get('/get-max-paper-id', PaperController.getMaxId);

//Other controllers
router.get('/get-colleges', OtherController.getColleges)
router.get('/get-courses/', OtherController.getCourses)
router.get('/get-department-colleges/', OtherController.getDeptColleges)
router.get('/get-departments/', OtherController.getDepartments)
router.get('/get-faculty-positions/', OtherController.getFacultyPositions)
router.get('/get-distinct-topics/', OtherController.getDistinctTopics)
router.get('/get-paper-by-student/', OtherController.getPapersByStudent)

//Reports
router.get('/get-report-one', ReportController.reportOne);
router.get('/get-report-two', ReportController.reportTwo);
router.get('/get-report-three', ReportController.reportThree);
router.get('/get-report-four', ReportController.reportFour);
router.get('/get-report-five', ReportController.reportFive);
router.get('/get-report-six', ReportController.reportSix);
router.get('/get-report-seven', ReportController.reportSeven);
router.get('/get-report-eight', ReportController.reportEight);

//Paper topics
router.get('/get-paper-topics', PaperTopicController.getPaperTopics)
router.get('/get-topic-by-paper', PaperTopicController.getTopicByPaper)
router.post('/insert-paper-topic', PaperTopicController.insertPaperTopic)
router.post('/delete-paper-topic', PaperTopicController.deletePaperTopic)


//Assigned Advisers
router.get('/get-assigned-advisers', AssignedAdviserController.getAssignedAdvisers)
router.post('/insert-assigned-advisers', AssignedAdviserController.insertAssignedAdviser)
router.post('/delete-assigned-advisers', AssignedAdviserController.deleteAssignedAdviser)

//Coauthor
router.get('/get-co-authors', CoAuthorController.getCoAuthors)
router.post('/insert-coauthor', CoAuthorController.insertCoAuthor)
router.post('/delete-coauthor', CoAuthorController.deleteCoAuthor)

//Panel
router.get('/get-panels', PanelController.getPanels)
router.post('/insert-panel', PanelController.insertPanel)
router.post('/delete-panel', PanelController.deletePanel)
module.exports = router;
