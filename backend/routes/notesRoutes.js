import express from 'express';
import { 
   createNotes, 
   getAllNotes, 
   getNotesByID, 
   updateNotes, 
   deleteNotes, 
   downloadNotes, 
   searchNotes,
   groupNotesBySubject,
   countNotesPerSubject,
   countSubjectsPerSemester,
   getNotesByTimeRange,
   getUnpublishedNotes
} from '../controllers/notesController.js';
import {upload} from '../config/multer.js';

const router = express.Router();

router.post('/create', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'fileUrl', maxCount: 1 }
]), createNotes);

router.get('/', getAllNotes);
router.get('/unp-notes', getUnpublishedNotes);
router.get('/search', searchNotes);
router.get('/groupsubjects', groupNotesBySubject);
router.get('/notespersubject', countNotesPerSubject);
router.get('/subjectpersemester', countSubjectsPerSemester);
router.get('/search/time', getNotesByTimeRange);

router.get('/download/:id', downloadNotes);
router.get('/:id', getNotesByID);

router.put('/update/:id', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'fileUrl', maxCount: 1 }
]), updateNotes);

router.delete('/delete/:id', deleteNotes);

export default router;
