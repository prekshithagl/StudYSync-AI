import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

const blank = { taskTitle: '', description: '', priority: 'MEDIUM', status: 'PENDING', dueDate: '' };

export default function Tasks() {
  const [tasks, setTasks] = useState({ content: [], totalPages: 0, number: 0 });
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const { notify } = useToast();

  const load = async (page = 0) => {
    const { data } = await api.get('/tasks', { params: { search, page, size: 6 } });
    setTasks(data);
  };

  useEffect(() => { load(0); }, [search]);

  const submit = async (event) => {
    event.preventDefault();
    editing ? await api.put(`/tasks/${editing}`, form) : await api.post('/tasks', form);
    notify(editing ? 'Task updated' : 'Task added');
    setForm(blank);
    setEditing(null);
    load(tasks.number);
  };

  const toggle = async (task) => {
    await api.put(`/tasks/${task.id}`, { ...task, status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' });
    load(tasks.number);
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    notify('Task deleted');
    load(tasks.number);
  };

  return (
    <section className="page">
      <PageHeader eyebrow="Tasks" title="Task management">
        <input className="date-filter" placeholder="Search tasks" value={search} onChange={(e) => setSearch(e.target.value)} />
      </PageHeader>
      <div className="two-column">
        <form className="panel form-panel" onSubmit={submit}>
          <h2>{editing ? 'Edit task' : 'Add task'}</h2>
          <label>Title<input value={form.taskTitle} onChange={(e) => setForm({ ...form, taskTitle: e.target.value })} required /></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label>Priority<select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></label>
          <label>Due Date<input type="date" value={form.dueDate || ''} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></label>
          <button className="primary-button">{editing ? 'Update Task' : 'Add Task'}</button>
        </form>
        <div className="panel">
          <h2>Tasks</h2>
          <div className="task-list">
            {tasks.content.map((task) => (
              <div className={`task-item ${task.status.toLowerCase()}`} key={task.id}>
                <button className="check-button" onClick={() => toggle(task)}><i className={`bi ${task.status === 'COMPLETED' ? 'bi-check-circle-fill' : 'bi-circle'}`} /></button>
                <div><strong>{task.taskTitle}</strong><small>{task.description || 'No description'} • {task.dueDate || 'No due date'}</small></div>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <button className="icon-button" onClick={() => { setEditing(task.id); setForm(task); }}><i className="bi bi-pencil" /></button>
                <button className="icon-button danger" onClick={() => remove(task.id)}><i className="bi bi-trash" /></button>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: tasks.totalPages || 1 }).map((_, index) => <button key={index} className={tasks.number === index ? 'active' : ''} onClick={() => load(index)}>{index + 1}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
