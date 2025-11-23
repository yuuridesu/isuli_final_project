<template>
  <div class="audit-logs">
    <h1>Audit Logs</h1>

    <table class="logs-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Action</th>
          <th>Model</th>
          <th>Old Values</th>
          <th>New Values</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs.data" :key="log.id">
          <td>
            {{ log.user?.firstname ?? "Unknown" }}
            {{ log.user?.lastname ?? "" }}
          </td>
          <td>{{ formatAction(log) }}</td>
          <td>{{ formatModel(log.auditable_type) }}</td>
          <td>
            <div v-if="hasValues(log.old_values)" class="values">
              <div
                v-for="(val, key) in filteredValues(log.old_values)"
                :key="key"
              >
                <strong>{{ key }}:</strong> {{ val }}
              </div>
            </div>
            <span v-else>-</span>
          </td>
          <td>
            <div v-if="hasValues(log.new_values)" class="values">
              <div
                v-for="(val, key) in filteredValues(log.new_values)"
                :key="key"
                :class="{ changed: isChanged(log.old_values, key, val) }"
              >
                <strong>{{ key }}:</strong> {{ val }}
              </div>
            </div>
            <span v-else>-</span>
          </td>
          <td>{{ new Date(log.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <div class="load-more" v-if="logs.next_page_url">
      <button @click="loadLogs">Load More</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      logs: {
        data: [],
        next_page_url: null,
      },
    };
  },
  mounted() {
    this.loadLogs();
  },
  methods: {
    async loadLogs() {
      try {
        const url = this.logs.next_page_url || "/admin/audit-logs";
        const res = await axios.get(url);

        this.logs.data = [...this.logs.data, ...res.data.data.data];
        this.logs.next_page_url = res.data.data.next_page_url;
      } catch (err) {
        console.error("Failed to load audit logs", err);
      }
    },

    // Map raw action/model to readable names
    formatAction(log) {
      const action = log.action?.toLowerCase();
      const model = log.auditable_type?.split("\\").pop();

      const actionMap = {
        ItemRequest: {
          created: "Requested Item",
          updated: "Updated Request",
          deleted: "Deleted Request",
        },
        Item: {
          created: "Reported Item",
          updated: "Updated Item",
          deleted: "Deleted Item",
        },
        User: {
          created: "Created User",
          updated: "Updated User",
          deleted: "Deleted User",
        },
        Notification: {
          created: "Notification Created",
          updated: "Notification Updated",
          deleted: "Notification Deleted",
        },
      };

      return (
        actionMap[model]?.[action] ||
        (action
          ? action.charAt(0).toUpperCase() + action.slice(1)
          : "Performed Action")
      );
    },

    formatModel(model) {
      if (!model) return "Unknown";
      return model.split("\\").pop();
    },

    hasValues(values) {
      if (!values) return false;
      let parsed;
      try {
        parsed = typeof values === "string" ? JSON.parse(values) : values;
      } catch {
        parsed = values;
      }
      return parsed && Object.keys(parsed).length > 0;
    },

    filteredValues(values) {
      let parsed;
      try {
        parsed = typeof values === "string" ? JSON.parse(values) : values;
      } catch {
        parsed = values;
      }
      if (!parsed) return {};
      const filtered = { ...parsed };
      delete filtered.id;
      delete filtered.created_at;
      delete filtered.updated_at;
      return filtered;
    },

    isChanged(oldValues, key, newVal) {
      if (!oldValues) return false;
      let oldParsed;
      try {
        oldParsed =
          typeof oldValues === "string" ? JSON.parse(oldValues) : oldValues;
      } catch {
        oldParsed = oldValues;
      }
      return oldParsed && oldParsed[key] !== newVal;
    },
  },
};
</script>

<style scoped>
.audit-logs {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  background: #f4f9f8;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1cc88a, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.logs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  table-layout: fixed;
  word-wrap: break-word;
}

thead {
  background: #1cc88a;
  color: white;
  text-transform: uppercase;
}

th,
td {
  padding: 12px 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
  vertical-align: top;
}

tbody tr:nth-child(even) {
  background: #f9f9f9;
}

tbody tr:hover {
  background: #d1f2e0;
  transition: background 0.3s ease;
}

.values {
  font-size: 13px;
  color: #333;
}

.values .changed {
  background-color: #d4f5d4;
  padding: 2px 4px;
  border-radius: 3px;
}

.load-more {
  margin-top: 15px;
  text-align: center;
}

.load-more button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #1cc88a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
}

.load-more button:hover {
  background-color: #17a2b8;
}

@media (max-width: 768px) {
  th,
  td {
    font-size: 12px;
    padding: 8px 6px;
  }
}
</style>
